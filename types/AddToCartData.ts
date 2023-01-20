export type AddToCartData = {
  productId: string;
  amount: number;
  title: string;
  image: string;
  singlePiecePrice: number;
  databaseCartItemId?: string; //this property is used to find item in firebase by it's assigned id
};
