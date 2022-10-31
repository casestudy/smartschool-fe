import { createGlobalStyle } from 'styled-components';

export const TableStyles = createGlobalStyle `
	.ant-table {
		background: inherit !important;
		min-height: 680px;
	}
	.ant-table-thead {
		height: 40px;
		background-color: #EFEBE9 !important;
	}
	.ant-table-row {
		background: #FFFFFF !important;
		margin-bottom: 1rem !important;
		cursor: pointer;
	}
	.ant-table-tbody > tr > td:last-child {
		border-top-right-radius: 15px !important;
		border-bottom-right-radius: 15px !important;
	}
	.ant-table-tbody > tr >  td:first-child {
		border-top-left-radius: 15px !important;
		border-bottom-left-radius: 15px !important;
	}
	.ant-table-tbody > tr > td {
		padding: 10px 10px 10px 15px !important;
		border-bottom: 0.2rem solid #EFEBE9 !important;
		border-top: 0.3rem solid #EFEBE9;
	}
	.ant-table thead > tr > th {
		border-radius: 13px !important;
		padding: 5px 7px 5px 10px !important;
		border: 0.4rem solid #EFEBE9 !important;
		background-color: #fff !important;
		font-weight: bold !important;
	}
	.ant-checkbox-checked .ant-checkbox-inner {
		background: #403B3B !important;
		border-color: #403B3B !important;
	}
	.ant-pagination-item {
		border: none !important;
		background: transparent !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
	}
	.ant-pagination-item a {
		font-family: 'Open Sans' !important;
		font-style: normal !important;
		font-weight: 600 !important;
		font-size: 16px !important;
		line-height: 22px !important;
		color: #8C8C8C !important;
		border: none !important;
		background: transparent !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
	}
	.ant-pagination-item-active {
		font-weight: 700 !important;
		border-radius: 8px !important;
		background: rgba(188, 100, 112, 0.15) !important;
	}
	.ant-pagination-item-active a {
		color: #403B3B !important;
		font-weight: 700 !important;
	}
	.ant-dropdown {
		position: absolute !important;
	}

	.ant-table-filter-dropdown-search {
		max-width: 100% !important;
		padding: 8px;
		border-bottom: none !important;
	}

	.ant-input-affix-wrapper {
		position: relative;
		display: inline-block;
		width: 90%;
		min-width: 0;
		padding: 0 !important;
		color: rgba(0, 0, 0, 0.85);
		font-size: 14px;
		line-height: 1.5715;
		background-image: none;
		border: none !important;
		border-radius: none !important;
		transition: all 0.3s;
		display: inline-flex;
	}

	.ant-checkbox-input[type='checkbox'] {
		border: 4px solid red !important;
		border-radius: 8px;
	}

	.ant-table-filter-dropdown {
		box-sizing: none !important;
		position: relative !important;
		padding: 0;
		color: rgba(0, 0, 0, 0.85);
		font-size: 14px;
		font-variant: tabular-nums;
		border: none !important;
		line-height: 1.5715;
		list-style: none;
		width: 100% !important;
		background-color: #fff;
		border-radius: none !important;
		left: 0.1rem !important;
		//box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
	}

	input[type='checkbox'] {
		box-sizing: none !important;
		border: 2px solid #000 !important;
		border-radius: 5px !important;
		padding: 0;
	}
	.ant-table-filter-dropdown-search-input .anticon {
		display: none !important;
	}
	.ant-table-filter-dropdown-search-input input {
		min-width: 10px !important;
		max-width: 100% !important;
		background-color: #efeded !important;
		padding: 2% 0 2% 3% !important;
		border-radius: 8px !important;
		height: 35px !important;
	}
	.ant-input:placeholder-shown {
		text-overflow: ellipsis;
	}

	.ant-table-thead th.ant-table-column:focus-visible {
		outline: #fff 1px !important;
	}
	.ant-table-filter-dropdown-btns {
		display: flex !important;
		align-items: flex-end !important;
		justify-content: space-between;
		padding: 7px 8px;
		overflow: hidden;
		background-color: inherit !important;
		border-top: none !important;
		margin-top: 1rem !important
	}

	.ant-table-filter-trigger:active, .ant-table-filter-trigger:focus-visible, .ant-table-filter-trigger:hover, .ant-table-filter-trigger:focus {
		background: rgba(228, 99, 100, 0.1) !important;
		border-radius: 8px !important;
	}

	.ant-btn-link {
		color: #bc6470 !important;
		border-color: none !important;
		background: transparent !important;
		font-size: 16px !important;
		font-weight: 600 !important;
	}

	.ant-btn-primary {
		color: #bc6470 !important;
		border-color: transparent !important;
		background: transparent !important;
		text-shadow: none !important;
		box-shadow: none !important;
		font-size: 16px !important;
		font-weight: 600 !important;
	}
	.ant-table-pagination {
		display: flex !important;
		align-items: center;
		background: #fff !important;
		row-gap: 29px !important;
		width: 310px !important;
		height: 45px !important;
		left: 561px !important;
		top: 1000px !important;
		border-radius: 8px !important;
		margin: 33px auto 0 auto !important;
	}
	.ant-table-pagination-center {
		justify-content: space-evenly !important;
	}
	.ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		font-size: 12px;
		text-align: center;
		background-color: #fff;
		border: none !important;
		border-radius: 2px;
		outline: none;
		transition: all 0.3s;
	}
	.ant-pagination {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		color: rgba(0, 0, 0, 0.85);
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5715;
		list-style: none;
		font-feature-settings: 'tnum';
	}
`;
//export default TableStyles;