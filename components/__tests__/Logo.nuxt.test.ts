import { describe, test, expect } from 'vitest'
import { renderSuspended } from 'nuxt-vitest/utils'
import { screen } from '@testing-library/vue'

import Logo from '../Logo.vue'

describe('Logo', () => {
  test('Рендер компонента', async () => {
    await renderSuspended(Logo)

    expect(screen.getByText('n3vito')).toBeDefined()
  })
})
