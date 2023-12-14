import { describe, test, expect } from 'vitest'
import { renderSuspended } from 'nuxt-vitest/utils'

import Header from '../Header.vue'

describe('Header', () => {
  test('Рендер компонента', async () => {
    await renderSuspended(Header)

    expect(document.querySelector('header')).toBeDefined()
  })
})
