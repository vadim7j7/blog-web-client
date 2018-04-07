import React from "react";
import PropTypes from "prop-types";


const BASE_SHIFT  = 1;
const TITLE_SHIFT = 1;

const TITLES = {
    first:   'First',
    prev:    '\u00AB',
    prevSet: '...',
    nextSet: '...',
    next:    '\u00BB',
    last:    'Last',
};


const Page = (props) => {
    if (props.isHidden) return null;

    const baseCss = props.className ? `${props.className} ` : '';
    const fullCss = `${baseCss}${props.isActive ? ' pt-active' : ''}${props.isDisabled ? ' pt-disabled' : ''}`;

    return (
        <a
            className={fullCss}
            role="button"
            onClick={props.onClick}
        >
            {props.children}
        </a>
    );
};

Page.propTypes = {
    isHidden:   PropTypes.bool,
    isActive:   PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick:    PropTypes.func,
};


class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.handleFirstPage     = this.handleFirstPage.bind(this);
        this.handlePreviousPage  = this.handlePreviousPage.bind(this);
        this.handleNextPage      = this.handleNextPage.bind(this);
        this.handleLastPage      = this.handleLastPage.bind(this);
        this.handleMorePrevPages = this.handleMorePrevPages.bind(this);
        this.handleMoreNextPages = this.handleMoreNextPages.bind(this);
        this.handlePageChanged   = this.handlePageChanged.bind(this);
    }

    getTitles(key) {
        return this.props.titles[key] || TITLES[key];
    }

    calcBlocks() {
        const props = this.props;
        const total = props.total;
        const blockSize = props.visiblePages;
        const current = props.current + TITLE_SHIFT;
        const blocks = Math.ceil(total / blockSize);
        const currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

        return {
            total:    blocks,
            current:  currBlock,
            size:     blockSize,
        };
    }

    isPrevDisabled() {
        return this.props.current + 1 <= BASE_SHIFT;
    }

    isNextDisabled() {
        return this.props.current >= (this.props.total - TITLE_SHIFT);
    }

    isPrevMoreHidden() {
        const blocks = this.calcBlocks();
        return (blocks.total === TITLE_SHIFT) || (blocks.current + 1 === BASE_SHIFT);
    }

    isNextMoreHidden() {
        const blocks = this.calcBlocks();
        return (blocks.total === TITLE_SHIFT) || (blocks.current === (blocks.total - TITLE_SHIFT));
    }

    visibleRange() {
        const blocks = this.calcBlocks();
        const start = blocks.current * blocks.size;
        const delta = this.props.total - start;
        const end = start + ((delta > blocks.size) ? blocks.size : delta);

        return [start + TITLE_SHIFT, end + TITLE_SHIFT];
    }


    handleFirstPage() {
        if (!this.isPrevDisabled()) {
            this.handlePageChanged(BASE_SHIFT);
        }
    }

    handlePreviousPage() {
        if (!this.isPrevDisabled()) {
            this.handlePageChanged(this.props.current - TITLE_SHIFT);
        }
    }

    handleNextPage() {
        if (!this.isNextDisabled()) {
            this.handlePageChanged(this.props.current + TITLE_SHIFT);
        }
    }

    handleLastPage() {
        if (!this.isNextDisabled()) {
            this.handlePageChanged(this.props.total - TITLE_SHIFT);
        }
    }


    handleMorePrevPages() {
        const blocks = this.calcBlocks();
        this.handlePageChanged((blocks.current * blocks.size) - TITLE_SHIFT);
    }


    handleMoreNextPages() {
        const blocks = this.calcBlocks();
        this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
    }

    handlePageChanged(num) {
        const handler = this.props.onPageChanged;
        if (handler) handler(num);
    }


    renderPages(pair) {
        return range(pair[0], pair[1]).map((num, idx) => {
            const current = num - TITLE_SHIFT;
            const onClick = this.handlePageChanged.bind(this, current);
            const isActive = (this.props.current === current);

            return (
                <Page
                    key={idx}
                    index={idx}
                    isActive={isActive}
                    className="pt-button"
                    onClick={onClick}
                >
                    {num}
                </Page>
            );
        });
    }


    render() {
        const titles = this.getTitles.bind(this);

        return (
            <div className="pt-button-group pt-large">
                <Page
                    className="pt-button pt-icon-chevron-left"
                    key="btn-first-page"
                    isDisabled={this.isPrevDisabled()}
                    onClick={this.handleFirstPage}
                />

                <Page
                    className="pt-button"
                    key="btn-prev-page"
                    isDisabled={this.isPrevDisabled()}
                    onClick={this.handlePreviousPage}
                >
                    {titles('prev')}
                </Page>

                <Page
                    className="pt-button"
                    key="btn-prev-more"
                    isHidden={this.isPrevMoreHidden()}
                    onClick={this.handleMorePrevPages}
                >
                    {titles('prevSet')}
                </Page>

                {this.renderPages(this.visibleRange())}

                <Page
                    className="pt-button"
                    key="btn-next-more"
                    isHidden={this.isNextMoreHidden()}
                    onClick={this.handleMoreNextPages}
                >
                    {titles('nextSet')}
                </Page>

                <Page
                    className="pt-button"
                    key="btn-next-page"
                    isDisabled={this.isNextDisabled()}
                    onClick={this.handleNextPage}
                >
                    {titles('next')}
                </Page>

                <Page
                    className="pt-button pt-icon-chevron-right"
                    key="btn-last-page"
                    isDisabled={this.isNextDisabled()}
                    onClick={this.handleLastPage}
                />
            </div>
        );
    }
}


Pagination.propTypes = {
    current:           PropTypes.number.isRequired,
    total:             PropTypes.number.isRequired,
    visiblePages:      PropTypes.number.isRequired,
    titles:            PropTypes.object,
    onPageChanged:     PropTypes.func,
};

Pagination.defaultProps = {
    titles: TITLES,
};



function range(start, end) {
    const res = [];
    for (let i = start; i < end; i++) {
        res.push(i);
    }

    return res;
}

export default Pagination;
