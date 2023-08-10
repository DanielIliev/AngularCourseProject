interface ProfileInformation {
  username: string;
  email: string;
}

interface ProfilePosts {
  _id: string;
  title: string;
  content: string;
}

export { ProfileInformation, ProfilePosts };
