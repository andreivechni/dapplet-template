import {} from '@dapplets/dapplet-extension';
import LIGHT_IMG from './icons/ex12.png';
import DARK_IMG from './icons/ex12_inverted.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Injected Button',
            img: {
              LIGHT: LIGHT_IMG,
              DARK: DARK_IMG,
            },
            exec: () => alert('Hello, Themes!'),
          },
        }),
    });
  }
}
