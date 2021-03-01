import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex03.png';
import STAMP_IMG from './icons/fakeStamp.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    // LP: 1. Get the widget 'picture' from adapter
    const { button, picture } = this.adapter.exports;
    // LP end
    // $ returns object "me". Use it to change state or params of the other widget
    // Example 1: exec: () => $(ctx, 'another_el_id').state = 'SECOND'
    // Example 2: exec: () => $(ctx, 'another_el_id').label = 'Hello'
    const { $ } = this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          id: 'button',
          DEFAULT: {
            label: 'FAKE',
            img: EXAMPLE_IMG,
            // LP: 2. Toggle the state “hidden/shown” of the picture on button click
            exec: () => {
              $(ctx, 'pic').hidden = !$(ctx, 'pic').hidden;
            },
            // LP end
          },
        }),
        // LP: 1. Add extra picture and make it hidden by default
        picture({
          id: 'pic',
          initial: 'DEFAULT',
          DEFAULT: {
            img: STAMP_IMG,
            hidden: true,
          },
        }),
        // LP end
      ],
    });
  }
}
