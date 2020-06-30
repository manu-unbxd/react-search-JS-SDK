import React from 'react';

import { ProductContextConsumer } from '../context'

import NoProducts from './NoProducts';
import ProductsWrapper from './ProductsWrapper';



const ProductsView = () => {
    return (<ProductContextConsumer>{({ data, helpers }) => {

        const { productViewType,
            productAttributes,
            perRow,
            variantAttributes,
            paginationType,
            heightDiffToTriggerNextPage,
            showVariants,
            showSwatches,
            swatchAttributes,
            groupBy,
            unbxdCoreStatus,
            query,
            productIdAttribute,
            showLoader } = data;

        const { getSearchResults,
            ZeroResultsComponent,
            onProductClick,
            getNextPage,
            ProductItemComponent,
            SwatchItemComponent,
            LoadMoreComponent,
            LoaderComponent } = helpers;

        const { numberOfProducts = 0, products = [], start = 0 } = getSearchResults() || {};

        //return the prop based Zero results template
        if (numberOfProducts === 0 && ZeroResultsComponent) {
            return !ZeroResultsComponent.prototype.render
                ? ZeroResultsComponent() : <ZeroResultsComponent />;
        }

        //return the default Zero results template
        if (numberOfProducts === 0) {
            return <NoProducts />;
        }

        return (<ProductsWrapper
            productViewType={productViewType}
            perRow={perRow}
            products={products}
            productAttributes={productAttributes}
            variantAttributes={variantAttributes}
            paginationType={paginationType}
            getNextPage={getNextPage}
            heightDiffToTriggerNextPage={heightDiffToTriggerNextPage}
            showVariants={showVariants}
            onProductClick={onProductClick}
            ProductItemComponent={ProductItemComponent}
            showSwatches={showSwatches}
            swatchAttributes={swatchAttributes}
            groupBy={groupBy}
            SwatchItemComponent={SwatchItemComponent}
            unbxdCoreStatus={unbxdCoreStatus}
            query={query}
            productIdAttribute={productIdAttribute}
            LoadMoreComponent={LoadMoreComponent}
            LoaderComponent={LoaderComponent}
            showLoader={showLoader}
            start={start}
        />)

    }}
    </ProductContextConsumer>);
}

export default ProductsView;
