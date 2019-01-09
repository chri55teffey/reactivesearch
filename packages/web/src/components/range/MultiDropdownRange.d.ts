import * as React from 'react';
import { CommonProps } from '../../';
import * as types from '../../types';

export interface MultiDropdownRangeProps extends CommonProps {
	beforeValueChange?: (...args: any[]) => any;
	customQuery?: (...args: any[]) => any;
	data?: types.data;
	dataField: string;
	defaultValue?: types.stringArray;
	value?: types.stringArray;
	filterLabel?: types.filterLabel;
	innerClass?: types.style;
	nestedField?: string;
	onValueChange?: (...args: any[]) => any;
	onChange?: (...args: any[]) => any;
	placeholder?: string;
	react?: types.react;
	showFilter?: boolean;
	title?: types.title;
	themePreset?: types.themePreset;
}

declare const MultiDropdownRange: React.ComponentType<MultiDropdownRangeProps>;

export default MultiDropdownRange;
