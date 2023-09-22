import React, { useEffect, useRef, useState } from 'react'
import EditableMathInputField from './EditableMathInputField/EditableMathInputField'
import { useFocused } from 'slate-react'

const MathFunctionModal = ({ initialLatex = "", isOpen, setOpen, save, edit, isEdit }) => {

    const mainContentRef = useRef()

    // const escapedLatex = initialLatex.replace('\\', '\\\\')

    const [latex, setLatex] = useState(initialLatex)


    // useEffect(() => {
    //     console.log(latex)
    // }, [latex])

    const closeModal = () => {
        setOpen(false)
    }

    const saveLatex = () => {
        if (isEdit) {
            edit(latex)
        }
        else {
            save(latex)
        }
        closeModal()
        setLatex("")
    }

    if (isOpen) {
        return (
            <div
                // onClick={(event) => {
                //     if (event.target !== mainContentRef.current) {
                //         closeModal()
                //     }
                // }}
                style={{
                    backgroundColor: "#11111164",
                    position: 'fixed',
                    left: "0",
                    top: "0",
                    width: '100%',
                    height: '100%',
                    zIndex: "2099",
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                <div ref={mainContentRef} style={{ height: "80vh", backgroundColor: "white", }}>
                    <div
                        style={{ padding: "20px" }}
                    >
                        Title
                    </div>
                    <div>
                        <EditableMathInputField latex={latex} setLatex={setLatex} />
                    </div>
                    <div                         style={{ padding: "20px" }}
>
                        <button disabled={latex == ""} onClick={() => saveLatex()}>Save</button>
                        <button onClick={() => closeModal()}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }

}

export default MathFunctionModal