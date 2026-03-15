import { render } from '@solidjs/testing-library';
import HaVaporwaveCard from './index';

describe('<HaVaporwaveCard />', () => {
  it('should render the app with default props', async () => {
    const { findByText, unmount } = render(() => <HaVaporwaveCard />);
    expect(await findByText('Hello World')).toBeInTheDocument();
    expect(
      await findByText('A Solid.js with Tailwind web component scaffold.')
    ).toBeInTheDocument();
    unmount();
  });

  it('should render the app with custom props', async () => {
    const { findByText, unmount } = render(() => (
      <HaVaporwaveCard
        description="Custom description."
        heading="Custom Heading"
      />
    ));
    expect(await findByText('Custom Heading')).toBeInTheDocument();
    expect(await findByText('Custom description.')).toBeInTheDocument();
    unmount();
  });
});
