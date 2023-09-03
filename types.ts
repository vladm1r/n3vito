export interface User {
  name: string,
  avatar?: string,
  phone: string
}

export interface Profile {
  full_name: string,
  phone: string
  avatar_url: string,
}

export interface Post {
  title: string,
  price: number,
  image_url: string,
  description: string,
  user_id: string,
}
export interface MenuItem {
  label: string,
  icon: string,
}

export type FileUploadSelectEvent = {
  originalEvent: Event
}

export enum Storages {
  AVATARS = 'avatars',
  IMAGES = 'images',
}
