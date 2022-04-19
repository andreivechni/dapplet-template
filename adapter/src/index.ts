import { IFeature } from '@dapplets/dapplet-extension';
import { Button } from './button';

type ContextBuilder = {
  [propName: string]: string;
};
type Exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
};

@Injectable
export default class GoogleAdapter {
  public exports = (): Exports => ({
    button: this.adapter.createWidgetFactory(Button),
  });

  // LP: 1. implement communication between dapplets and pages
  public config = {
    MENU: {
      containerSelector: '#cnt, .ndYZfc',
      contextSelector: '#top_nav, .jZWadf',
      insPoints: {
        MENU: {
          selector: '.MUFPAc, .T47uwc',
          insert: 'inside',
        },
      },
      contextBuilder: (): ContextBuilder => ({
        id: '',
        insertPoint: '#rcnt, .mJxzWe',
      }),
    },
    SEARCH_RESULT: {
      containerSelector: '#search',
      contextSelector: '#rso > .g .jtfYYd, #rso > div > .g .jtfYYd, #rso > div > div > .g .jtfYYd',
      insPoints: {
        SEARCH_RESULT: {
          selector: '.yuRUbf',
          insert: 'inside',
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contextBuilder: (searchNode: any): ContextBuilder => ({
        id: searchNode.querySelector('.yuRUbf > a')?.href,
        title: searchNode.querySelector('h3')?.textContent,
        link: searchNode.querySelector('.yuRUbf > a')?.href,
        description:
          searchNode.querySelector('.uUuwM')?.textContent ||
          searchNode.querySelector('.IsZvec')?.textContent,
      }),
    },
    // LP: 6. Add new insertion point WIDGETS on the top of Google widgets.

    // LP end
    // LP: 7. Add a new insertion point DAPPLET_SEARCH_RESULT, which is similar to SEARCH_RESULT but adds a button to our search widget.

    // LP end
  };
  // LP end

  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    @Inject('dynamic-adapter.dapplet-base.eth') readonly adapter: any,
  ) {
    this.adapter.configure(this.config);
  }

  public attachConfig(feature: IFeature): void {
    this.adapter.attachConfig(feature);
  }

  public detachConfig(feature: IFeature): void {
    this.adapter.detachConfig(feature);
  }
}
