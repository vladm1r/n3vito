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
  test('is render', async () => {
    await renderSuspended(ContactCart, {
      props: {
        data: mockData
      }
    })

    expect(screen.getByText(mockData.full_name)).toBeDefined()
    expect(screen.getByText(mockData.phone)).toBeDefined()
  })

  test('phone is accessable', async () => {
    await renderSuspended(ContactCart, {
      props: {
        data: mockData
      }
    })

    expect(document.querySelector('a')?.getAttribute('href')).toBe(`tel:${mockData.phone}`)
  })
})
