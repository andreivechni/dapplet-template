import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex01.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (ctx: any) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.

            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: () => alert('Hello, World!'),
            // LP end
          },
        }),
    });
  }
}
