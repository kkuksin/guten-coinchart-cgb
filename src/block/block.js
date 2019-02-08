/**
 * BLOCK: guten-coinchart-cgb
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import classnames from 'classnames';
import Iframe from 'react-iframe';

import './style.scss';
import './editor.scss';
import currency from "./currency.js";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	InspectorControls,
	PanelColorSettings,
} = wp.editor;
const {
	PanelBody,
	SelectControl,
} = wp.components;

class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const backgroundColors = [
			{color: '#ffffff', name: 'white'},
			{color: '#00d1b2', name: 'teal'},
			{color: '#3373dc', name: 'royal blue'},
			{color: '#209cef', name: 'sky blue'},
			{color: '#22d25f', name: 'green'},
			{color: '#ffdd57', name: 'yellow'},
			{color: '#ff3860', name: 'pink'},
			{color: '#7941b6', name: 'purple'},
			{color: '#000000', name: 'black'},
		];
		const alignOptions = [
			{value: 'left', label: __('Left')},
			{value: 'center', label: __('Center')},
			{value: 'right', label: __('Right')},
		];
		const widgetTheme = [
			{value: 'light', label: __('Light')},
			{value: 'dark', label: __('Dark')},
		];
		const widgetType = [
			{value: 'full_v2', label: __('Full list of Top Crypto Currencies')},
			{value: 'chart', label: __('Live Coin Chart Widget')},
			{value: 'single_v2', label: __('Single Coin Live Widget')},
			{value: 'converter', label: __('Crypto Currency Converter')},
			{value: 'horizontal_v2', label: __('Horizontal Live Ticker')},
		];
		const currencyPrice = currency.price;
		const currencyCoin = currency.coin;
		const coinCount = [
			{value: 3, label: '3'},
			{value: 5, label: '5'},
			{value: 6, label: '6'},
			{value: 7, label: '7'},
			{value: 8, label: '8'},
			{value: 9, label: '9'},
			{value: 10, label: '10'},
			{value: 11, label: '11'},
			{value: 12, label: '12'},
			{value: 15, label: '15'},
			{value: 20, label: '20'},
			{value: 30, label: '30'},
			{value: 40, label: '40'},
			{value: 50, label: '50'},
			{value: 75, label: '75'},
			{value: 100, label: '100'},
		];
		const withGraph = [
			{value: 'yes', label: __('Yes')},
			{value: 'no', label: __('No')},
		];
		const invertHover = [
			{value: 'no', label: __('Animated ticker, pauses on hover')},
			{value: 'yes', label: __('Static ticker, scrolls on hover')},
		];
		const widgetWidth = [
			{value: '220px', label: '220'},
			{value: '230px', label: '230'},
			{value: '240px', label: '240'},
			{value: '250px', label: '250'},
			{value: '260px', label: '260'},
			{value: '270px', label: '270'},
			{value: '280px', label: '280'},
			{value: '290px', label: '290'},
			{value: '300px', label: '300'},
			{value: '310px', label: '310'},
			{value: '320px', label: '320'},
			{value: '330px', label: '330'},
			{value: '340px', label: '340'},
			{value: '350px', label: '350'},
			{value: '360px', label: '360'},
			{value: '370px', label: '370'},
			{value: '380px', label: '380'},
			{value: '390px', label: '390'},
			{value: '400px', label: '400'},
		];
		const widgetWidthDefault = {
			full_v2: '100%',
			chart: '100%',
			single_v2: '250px',
			converter: '250px',
			horizontal_v2: '100%',
		};
		const widgetHeight = {
			full_v2: '409px',
			chart: '536px',
			single_v2: '196px',
			converter: '310px',
			horizontal_v2: '36px',
		};
		const {
			setAttributes,
			attributes: {
				block_title,
				background_color,
				text_color,
				alignment,
				widget_type,
				widget_theme,
				coin_id,
				pref_coin_id,
				coin_count,
				with_graph,
				invert_hover,
				widget_width,
				widget_height,
			}
		} = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelColorSettings
					title={__('Background Color')}
					initialOpen={false}
					colorSettings={[{
						value: background_color,
						colors: backgroundColors,
						onChange: (value) => setAttributes({background_color: value}),
						label: __('Block Background Color'),

					}]}
				/>
				<PanelColorSettings
					title={__('Title Color')}
					initialOpen={false}
					colorSettings={[{
						value: text_color,
						colors: backgroundColors,
						onChange: (value) => setAttributes({text_color: value}),
						label: __('Block Title Color'),

					}]}
				/>
				<PanelBody
					title={__('Title Alignment')}
					initialOpen={false}>
					<SelectControl
						label={__('Block Title Alignment')}
						description={__('Left, center or right align the block title.')}
						options={alignOptions}
						value={alignment}
						onChange={(value) => this.props.setAttributes({alignment: value})}
					/>
				</PanelBody>
				<PanelBody
					title={__('Widget Settings')}
					initialOpen={false}>
					<SelectControl
						label={__('Widget Theme')}
						description={__('Widget Theme color')}
						options={widgetTheme}
						value={widget_theme}
						onChange={(value) => this.props.setAttributes({widget_theme: value})}
					/>
					<SelectControl
						label={__('Widget Type')}
						description={__('Widget Type')}
						options={widgetType}
						value={widget_type}
						onChange={(value) => this.props.setAttributes({
							widget_type: value,
							widget_height: widgetHeight[value],
							widget_width: widgetWidthDefault[value]
						})}
					/>
					{widget_type && (widget_type === 'single_v2' || widget_type === 'converter') && (
						<SelectControl
							label={__('Widget Width')}
							description={__('Widget Width')}
							options={widgetWidth}
							value={widget_width}
							onChange={(value) => this.props.setAttributes({widget_width: value})}
						/>
					)}
					{widget_type && widget_type === 'full_v2' && (
						<SelectControl
							label={__('Coin count')}
							description={__('Coin count')}
							options={coinCount}
							value={coin_count}
							onChange={(value) => this.props.setAttributes({
								coin_count: value,
								widget_height: (60 * value + 50) + 'px',
							})}
						/>
					)}
					{widget_type && widget_type === 'full_v2' && (
						<SelectControl
							label={__('Graph')}
							description={__('Graph')}
							options={withGraph}
							value={with_graph}
							onChange={(value) => this.props.setAttributes({with_graph: value})}
						/>
					)}
					{widget_type && widget_type === 'horizontal_v2' && (
						<SelectControl
							label={__('Ticker animation')}
							description={__('Ticker animation')}
							options={invertHover}
							value={invert_hover}
							onChange={(value) => this.props.setAttributes({invert_hover: value})}
						/>
					)}
					{widget_type && (widget_type === 'single_v2' || widget_type === 'chart') && (
						<SelectControl
							label={__('Coin')}
							description={__('Coin')}
							options={currencyCoin}
							value={coin_id}
							onChange={(value) => this.props.setAttributes({coin_id: value})}
						/>
					)}
					{widget_type && widget_type !== 'converter' && (
						<SelectControl
							label={__('Price currency')}
							description={__('Price currency')}
							options={currencyPrice}
							value={pref_coin_id}
							onChange={(value) => this.props.setAttributes({pref_coin_id: value})}
						/>
					)}
				</PanelBody>
			</InspectorControls>
		);
	}
}

class CGBCoinchartBlock extends Component {

	render() {

		const {
			attributes: {
				block_title,
				background_color,
				text_color,
				alignment,
				widget_type,
				widget_theme,
				coin_id,
				pref_coin_id,
				coin_count,
				with_graph,
				invert_hover,
				widget_width,
				widget_height,
			},
			setAttributes
		} = this.props;

		return [
			<Inspector
				{...{setAttributes, ...this.props}}
			/>,
			<div
				id="cgb-coinchart"
				className="cgb-coinchart"
				style={{
					backgroundColor: background_color,
					padding: '15px'
				}}
			>
				<RichText
					tagName="h2"
					placeholder={__('Add block title...')}
					keepPlaceholderOnFocus
					value={block_title}
					formattingControls={['bold', 'italic', 'strikethrough', 'link']}
					className={classnames(
						'cgb-coinchart-title'
					)}
					style={{
						color: text_color,
						textAlign: alignment,
					}}
					onChange={(value) => setAttributes({block_title: value})}
				/>
				<div className={classnames('cgb-coinchart-content', alignment)}>
					<Iframe
						url={'https://widget.coinlib.io/widget?type=' + widget_type + '&theme=' + widget_theme + '&coin_id=' + coin_id + '&pref_coin_id=' + pref_coin_id + '&cnt=' + coin_count + '&graph=' + with_graph + '&invert_hover=' + invert_hover}
						position='relative'
						width={widget_width}
						height={widget_height}
						className={classnames('cgb-coinchart-content-widget')}
						styles={{
							overflow: 'auto',
							border: '0',
							padding: '0',
							margin: '0',
							lineHeight: '14px',
							boxSizing: 'content-box'
						}}
					/>
				</div>
			</div>
		];
	}
}

/**
 * Register: Coin Chart Gutenberg Block.
 */
registerBlockType( 'cgb/block-guten-coinchart-cgb', {
	title: __( 'Coin Chart - CGB Block' ),
	icon: 'chart-line',
	category: 'embed',
	keywords: [
		__( 'coin' ),
		__( 'chart' ),
		__( 'cgb' ),
	],

	attributes: {
		block_title: {
			type: 'string',
			default: 'Coin Chart'
		},
		background_color: {
			type: 'string',
			default: 'white'
		},
		text_color: {
			type: 'string',
			default: 'black'
		},
		alignment: {
			type: 'string',
			default: 'left'
		},
		widget_theme: {
			type: 'string',
			default: 'light'
		},
		widget_type: {
			type: 'string',
			default: 'chart'
		},
		coin_id: {
			type: 'int',
			default: 859
		},
		pref_coin_id: {
			type: 'int',
			default: 1505
		},
		coin_count: {
			type: 'int',
			default: 6
		},
		with_graph: {
			type: 'string',
			default: 'yes'
		},
		invert_hover: {
			type: 'string',
			default: 'no'
		},
		widget_width: {
			type: 'string',
			default: '100%'
		},
		widget_height: {
			type: 'string',
			default: '536px'
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 */
	edit: CGBCoinchartBlock,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 */
	save: function( props ) {
		const {
			attributes: {
				block_title,
				background_color,
				text_color,
				alignment,
				widget_type,
				widget_theme,
				coin_id,
				pref_coin_id,
				coin_count,
				with_graph,
				invert_hover,
				widget_width,
				widget_height,
			}
		} = props;
		return (
			<div id="cgb-coinchart" className="cgb-coinchart" style={{
				backgroundColor: background_color
			}}>
				{block_title && !!block_title.length && (
					<RichText.Content
						tagName="h2"
						className="cgb-coinchart-title"
						style={{
							color: text_color,
							textAlign: alignment
						}}
						value={block_title}
					/>
				)}
				<div className={classnames('cgb-coinchart-content', alignment)}>
					<Iframe
						url={'https://widget.coinlib.io/widget?type=' + widget_type + '&theme=' + widget_theme + '&coin_id=' + coin_id + '&pref_coin_id=' + pref_coin_id + '&cnt=' + coin_count + '&graph=' + with_graph + '&invert_hover=' + invert_hover}
						position='relative'
						width={widget_width}
						height={widget_height}
						className={classnames('cgb-coinchart-content-widget')}
						style={{
							overflow: 'auto',
							border: '0',
							padding: '0',
							margin: '0',
							lineHeight: '14px',
							boxSizing: 'content-box'
						}}
					/>
				</div>
			</div>
		);
	},
} );
