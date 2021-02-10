import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex06.png';

@Injectable
export default class ViewportFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('common-adapter.dapplet-base.eth') public adapter: any;
  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      BODY: () =>
        button({
          DEFAULT: {
            tooltip: 'Injected Button',
            img: EXAMPLE_IMG,
            exec: () => alert('Hello, World!'),
          },
        }),
    });
  }
}
