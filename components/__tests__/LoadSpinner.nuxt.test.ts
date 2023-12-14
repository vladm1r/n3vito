import { describe, test, expect } from 'vitest'
import { renderSuspended } from 'nuxt-vitest/utils'

import LoadSpinner from '../LoadSpinner.vue'

describe('LoadSpinner', () => {
  test('Рендер компонента', async () => {
    await renderSuspended(LoadSpinner)

    expect(document.querySelector('.spinner')).toBeDefined()
  })
})
