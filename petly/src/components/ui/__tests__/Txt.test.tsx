import { render, screen } from '@testing-library/react-native';
import { Modal } from 'react-native';

import { palettes } from '@/core/theme/tokens';
import { useSettings } from '@/stores/settings';

import { Txt } from '../Txt';

const colorOf = (el: ReturnType<typeof screen.getByText>) => {
  const style = Array.isArray(el.props.style) ? Object.assign({}, ...el.props.style.flat()) : el.props.style;
  return style.color;
};

describe('<Txt> resolves its colour in JS', () => {
  afterEach(() => useSettings.getState().set({ theme: 'system' }));

  it('sets an explicit colour with no provider or CSS variables in the tree', async () => {
    useSettings.getState().set({ theme: 'dark' });
    await render(<Txt>Hello</Txt>);
    expect(colorOf(screen.getByText('Hello'))).toBe(palettes.dark.text);
  });

  it('keeps the right colour inside a native Modal (a portal)', async () => {
    useSettings.getState().set({ theme: 'dark' });
    await render(
      <Modal visible>
        <Txt tone="textSecondary">Inside modal</Txt>
      </Modal>,
    );
    expect(colorOf(screen.getByText('Inside modal'))).toBe(palettes.dark.textSecondary);
  });

  it('follows the light palette and tones', async () => {
    useSettings.getState().set({ theme: 'light' });
    await render(<Txt tone="onPrimary">On brand</Txt>);
    expect(colorOf(screen.getByText('On brand'))).toBe(palettes.light.onPrimary);
  });
});
