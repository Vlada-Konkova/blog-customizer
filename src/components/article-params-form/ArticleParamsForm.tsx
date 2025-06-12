import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select/Select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';

interface ArticelParamsFormProps {
	stateArticle: ArticleStateType;
	setStateArticle: (data: ArticleStateType) => void;
}
export const ArticleParamsForm = ({
	stateArticle,
	setStateArticle,
}: ArticelParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedStateArticle, setSelectedStateArticle] =
		useState<ArticleStateType>(stateArticle);

	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onChange: setIsOpen,
	});

	useEffect(() => {
		if (!isOpen) {
			setSelectedStateArticle(stateArticle);
		}
	}, [isOpen, stateArticle]);

	const handleChoiceState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedStateArticle({ ...selectedStateArticle, [key]: value });
	};
	const handleSubmitStateArticle = (e: SyntheticEvent) => {
		e.preventDefault();
		setStateArticle(selectedStateArticle);
	};

	const handleResetStateArticle = () => {
		setSelectedStateArticle(stateArticle);
		setStateArticle(stateArticle);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleSubmitStateArticle}>
					<Text size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='Шрифт'
						selected={selectedStateArticle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(options) =>
							handleChoiceState('fontFamilyOption', options)
						}
					/>
					<Select
						title='Размер шрифта'
						selected={selectedStateArticle.fontSizeOption}
						options={fontSizeOptions}
						onChange={(options) => handleChoiceState('fontSizeOption', options)}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectedStateArticle.fontColor}
						options={fontColors}
						onChange={(options) => handleChoiceState('fontColor', options)}
					/>
					<Select
						title='Цвет фона'
						selected={selectedStateArticle.backgroundColor}
						options={backgroundColors}
						onChange={(options) =>
							handleChoiceState('backgroundColor', options)
						}
					/>
					<Select
						title='Ширина контента'
						selected={selectedStateArticle.contentWidth}
						options={contentWidthArr}
						onChange={(options) => handleChoiceState('contentWidth', options)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetStateArticle}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
