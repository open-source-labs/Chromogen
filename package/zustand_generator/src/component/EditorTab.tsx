import React from 'react';

type Props = {
    setIsHidden: Function,
    isHidden: boolean,
}

const tab: React.CSSProperties = {
    height: '32px',
    width: '138px',
    backgroundColor: 'rgb(243, 246, 248, 0.03)',
    border: '1px solid rgba(243, 246, 248, 0.05)',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px',
    gap: '8px',
    position: 'absolute',
    right: '8px',
    top: '8px',
    cursor: 'pointer',
}

const tabArrow: React.CSSProperties = {
    width: '20px',
    height: '20px',
    backgroundColor: 'red',
}

const tabText: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    color: 'rgba(243, 246, 248, 0.7)'
}

const EditorTab = (props: Props): JSX.Element => {
    const { isHidden, setIsHidden } = props;
    return (
        <button type='button' style={tab} onClick={() => setIsHidden(!isHidden)}>
            <div style={tabArrow}/>
            <div style={tabText}>Chromogen</div>
        </button>
    )
}

export default EditorTab;