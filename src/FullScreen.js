import React, { useEffect, useState } from 'react'

const FullScreen = () => {

    const [isFullscreen, setFullscreen] = useState(false)

    const [fullscreenChanged, setFullscreenChanged] = useState(0)

    const [visibilitychange, setVisibilityChanged] = useState(0)

    const [fullScreenElementDisplay, setFullScreenElementDisplay] = useState(document.fullscreenElement)

    const enterFullscreen = () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
            console.log("full")
        }

    }

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen()
            console.log("exit")
        }
    }

    const toggleFullscreen = () => {
        fullScreenElementDisplay==null?enterFullscreen():exitFullscreen()
    }

    useEffect(() => {
        const handleKeydown = (event) => {
          if (event.key === 'F11') {
            event.preventDefault(); // Prevent the browser's default F11 behavior
            toggleFullscreen();
          }
        };
    
        document.addEventListener('keydown', handleKeydown);
    
        return () => {
          document.removeEventListener('keydown', handleKeydown);
        };
      })

    useEffect(()=>{
        console.log(fullScreenElementDisplay)
    },[fullScreenElementDisplay])



    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setFullscreenChanged(fullscreenChanged + 1)
            }
            setFullScreenElementDisplay(document.fullscreenElement)
        }; 
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    });

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // The page is now hidden (user switched tabs or minimized the window)
                console.log('Tab is now hidden');
                setVisibilityChanged(visibilitychange + 1)
                // You can add your code here to handle tab change
            } else {
                // The page is now visible (user switched back to the tab)
                console.log('Tab is now visible');
                // You can add your code here to handle tab change
            }
        };

        const handlePageHide = (event) => {
            event.preventDefault()
            event.returnValue = ""
        }

        window.addEventListener("pagehide", handlePageHide)

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            // Cleanup: Remove the event listener when the component unmounts
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }); // Empty dependency array to run this effect once on mount


    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Cancel the event to prevent the user from leaving the page
            event.preventDefault();
            // Customize the message that will be displayed to the user
            event.returnValue = 'Are you sure you want to leave this page?';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Cleanup: Remove the event listener when the component unmounts
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }); //





    return (
        <div>
            <div>
                <div>
                    Changed FullScreen: {fullscreenChanged}<br />
                    Visibility Changed: {visibilitychange}
                </div>
                <button onClick={() => toggleFullscreen()}>Enter</button>
                {fullScreenElementDisplay==null?"false":"true"}
            </div>
        </div>
    )
}

export default FullScreen