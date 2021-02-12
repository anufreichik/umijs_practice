import React, { useEffect } from "react";
import { connect } from "umi";
import 'bootstrap/dist/css/bootstrap.min.css';

export interface IBook {
  _id: string;
  name?: string;
  sellPrice?: Number;
  purchasedPrice?: Number;
}

 interface IProps {
  BooksList: IBook[];
  getBooks: () => void;
}


function BookList(props: IProps) {
  useEffect(() => {
    props.getBooks();
  }, []);

  if(!props.BooksList) return null;
  return (
    <div className='container justify-content-center'>
      <h2>Books</h2>
      {props.BooksList.map(el=>
      <li className='list-group-item'>{el.name} -${el.sellPrice}</li>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  BooksList: state.Book.booksList
});

const mapDispatchToProps = (dispatch: any) => ({
  getBooks: () => dispatch({ type: "Book/getBooks" })
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
