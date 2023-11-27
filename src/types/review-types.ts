export interface ReviewProps {
  id: string;
  date: string | Date;
  user: string;
  comment: string;
  rating: number;
}

export interface UserReview {
  id: number;
  comment: string;
  user: string;
  date: Date;
  rating: number;
}

export interface AddUserReview {
  filmId: string;
  comment: string;
  rating: number;
}


