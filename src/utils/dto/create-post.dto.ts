// src/dto/create-post.dto.ts
export class CreatePostDto {
  title: string;
  content: string;
  tags?: string[];
  uploadedImages?: PostImage[];
}