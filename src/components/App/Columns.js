import React from "react";
import Column from "components/Column/Column";

import { connect } from "react-redux";
import { getColumns } from "redux/selectors";
import { addCardToColumn } from "redux/actions";

import styles from './Columns.module.scss'

const Columns = ({ columns, addCardToColumn }) => (
  <ul className={styles.columnList}>
    {columns && columns.length
      ? columns.map(({ name, cards }, index) => {
            const handleClick = () => {
                addCardToColumn(index)
            }

          return <Column key={`col-${name}`} cards={cards} name={name} index={index} onAddClick={handleClick} />;
        })
      : null}
  </ul>
);

const mapStateToProps = state => {
  const columns = getColumns(state)
  return { columns }
}

export default connect(mapStateToProps, { addCardToColumn })(Columns)
