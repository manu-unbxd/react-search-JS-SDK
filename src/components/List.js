import React from 'react';
import PropTypes from 'prop-types';


const List = ({ items, activeItem, ListItem, idAttribute = "id", className = '', onClick, ...props }) => {
    return (<div className={`UNX-list ${className}`} onClick={onClick?onClick:null}>
        {items.map(item => {

            return <ListItem
                itemData={item}
                idAttribute={idAttribute}
                onClick={onClick?onClick:null}
                isActive={activeItem === item.id}
                {...props}
                key={item[idAttribute]} />
        })}
    </div>)
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    activeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ListItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    className:PropTypes.string,
    onClick:PropTypes.func,
    idAttribute: PropTypes.string
}

export default List;
