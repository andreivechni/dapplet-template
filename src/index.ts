import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex05.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  // LP: define variables `wallet`, `_currentAddress` and `_transferAmount`

  // LP end

  async activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Connect',
            img: EXAMPLE_IMG,
            // LP: 1. Open wallet

            // LP end
          },
          // LP: 2. Add states CONNECTED, PENDING, REGECTED, `MINING`, COMPLETED and UNAVAILABLE.
          // LP: 3. Send the necessary data to wallet and listen for the answer.
          // LP: 4. Show the state of the transaction

          // LP end
        }),
    });
  }
}
