/* Custom dropdown selector with an icon a help caption  */
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Row } from 'antd'
import React from 'react'
import './DropdownSelector.scss'

interface DropdownSelectorProps {
    label?: string
    value: string | null
    onValueChange: (value: string) => void
    options: DropdownOption[]
    hideDescriptionOnDisplay?: boolean // Hides the description support text on the main display component (i.e. only shown in the dropdown menu)
    disabled?: boolean
}

interface DropdownOption {
    key: string
    label: string
    description?: string
    icon: JSX.Element
    hidden?: boolean
}

interface SelectItemInterface {
    icon: JSX.Element
    label: string
    description?: string
    onClick: () => void
}

function SelectItem({ icon, label, description, onClick }: SelectItemInterface): JSX.Element {
    return (
        <div onClick={onClick}>
            <Row align={'middle'}>
                {icon}
                <div style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 4 }}>{label}</div>
            </Row>
            {description && <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.5)' }}>{description}</div>}
        </div>
    )
}

export function DropdownSelector({
    label,
    value,
    onValueChange,
    options,
    hideDescriptionOnDisplay,
    disabled,
}: DropdownSelectorProps): JSX.Element {
    const selectedOption = options.find((opt) => opt.key === value)

    const menu = (
        <Menu>
            {options.map(({ key, hidden, ...props }) => {
                if (hidden) {
                    return null
                }
                return (
                    <Menu.Item key={key}>
                        <SelectItem {...props} onClick={() => onValueChange(key)} />
                    </Menu.Item>
                )
            })}
        </Menu>
    )

    return (
        <>
            {label && <label className="ant-form-item-label">{label}</label>}
            <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
                <div className={`dropdown-selector${disabled ? ' disabled' : ''}`} onClick={(e) => e.preventDefault()}>
                    <div style={{ flexGrow: 1 }}>
                        {selectedOption && (
                            <SelectItem
                                {...selectedOption}
                                onClick={() => {}}
                                description={hideDescriptionOnDisplay ? undefined : selectedOption.description}
                            />
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <DownOutlined />
                    </div>
                </div>
            </Dropdown>
        </>
    )
}
