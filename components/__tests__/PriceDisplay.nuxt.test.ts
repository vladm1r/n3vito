import { describe, test, expect } from 'vitest'
import { renderSuspended } from 'nuxt-vitest/utils'
import { screen } from '@testing-library/vue'

import PriceDisplay from '../PriceDisplay.vue'

describe('PriceDisplay', () => {
  test('Рендер компонента', async () => {
    await renderSuspended(PriceDisplay, {
      props: {
        value: 1000
      }
    })

    expect(screen.getByText('1 000 ₽')).toBeDefined()
  })
})
