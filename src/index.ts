import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex07.png';

@Injectable
export default class VirtualFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('identity-adapter.dapplet-base.eth') public adapter: any;
  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            exec: () => alert('Hello, World!'),
          },
        }),
    });
  }
}
