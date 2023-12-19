import { Descriptor, autoSetIds } from './lang'

const basic = autoSetIds(
  {
    slogan: undefined as unknown as Descriptor,
    aphorisms: undefined as unknown as Descriptor,
  },
  'basic',
)

export { basic }
