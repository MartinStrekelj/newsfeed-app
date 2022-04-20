/**
 * Random avatar generator
 * src: https://avatars.dicebear.com/
 */

const AVATAR_STYLE = "adventurer";

export const fetchAvatar = (id: number) =>
  `https://avatars.dicebear.com/api/${AVATAR_STYLE}/${id}.svg`;
