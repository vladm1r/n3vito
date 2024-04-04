export interface User {
  id: string,
}

export interface Profile extends User {
  full_name: string,
  phone: string
  avatar_url: string,
}

export interface Post {
  title: string,
  price: number,
  image_url: string,
  description: string
}

export interface newPost extends Post {
  user_id: string
}

export interface createdPost extends Post {
  id: string,
  created_at?: Date,
}

export interface MenuItem {
  label: string,
  icon: Component,
  action?: Function
}

export enum Storages {
  AVATARS = 'avatars',
  IMAGES = 'images',
}
