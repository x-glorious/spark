import { Descriptor, autoSetIds } from './lang'

const home = autoSetIds(
  {
    vision: undefined as unknown as Descriptor,
  },
  'home',
)

export { home }
