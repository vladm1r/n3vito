import { describe, test, expect } from 'vitest'
import { renderSuspended } from 'nuxt-vitest/utils'
import { screen } from '@testing-library/vue'

import ContactCart from '../ContactCart.vue'

import type { Profile } from '@/types'

const mockData:Profile = {
  full_name: 'testName',
  phone: '1234',
  avatar_url: '0.795763589347734.png'
}

describe('ContactCart', () => {
  test('Рендер компонента', async () => {
    await renderSuspended(ContactCart, {
      props: {
        data: mockData
      }
    })

    expect(screen.getByText(mockData.full_name)).toBeDefined()
    expect(screen.getByText(mockData.phone)).toBeDefined()
  })

  test('Телефон кликабелен', async () => {
    await renderSuspended(ContactCart, {
      props: {
        data: mockData
      }
    })

    expect(document.querySelector('.contact-cart__phone')?.getAttribute('href')).toBe(`tel:${mockData.phone}`)
  })
})
