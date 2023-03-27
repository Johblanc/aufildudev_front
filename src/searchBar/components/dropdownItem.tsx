import { useEffect, useState } from 'react';
import { IconCheckBox } from '../../Articles/Components/ArticleFull/Icon_CheckBox';
import { TMini } from '../types/TMini';

export default function DropdownItem(props: {
    data: TMini;
    value: boolean;
    setValue: (id: number, val: boolean) => void;
}) {
    const { data, value, setValue } = props;
    const [currentValue, setCurrentValue] = useState<boolean>(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const iconList = [
        'back-end',
        'c-sharp',
        'c',
        'c++',
        'css',
        'design',
        'express',
        'front-end',
        'html',
        'java',
        'javascript',
        'nestjs',
        'python',
        'svg',
        'template',
        'typeORM',
        'typescript',
        'utilities',
    ];

    const iconPath = `./ressources/icons/${
        iconList.includes(data.name) ? data.name : 'unknow'
    }.svg`;

    return (
        <span
            className="dropdown-item d-flex justify-content-between"
            onClick={() => setValue(data.id, !currentValue)}
        >
            <span>
                <IconCheckBox value={value} />
            </span>
            <span>
                <p>{data.name}</p>
            </span>
            <span>
                <img
                    className="item-icon"
                    src={iconPath}
                    alt={`icône de ${data.name}`}
                />
            </span>
        </span>
    );
}
