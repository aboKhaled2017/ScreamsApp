import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

interface IMyButtonProps {
    onClick?:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    btnClassName?:string
    tip?:string
    tipClassName?:string
}

const MyButton: React.FC<IMyButtonProps> = (props) => (
    <Tooltip title={props.tip||''} className={props.tipClassName||''}>
       <IconButton onClick={props.onClick} className={props.btnClassName||''}>
           {props.children}
       </IconButton>
    </Tooltip>
)

export default MyButton;
