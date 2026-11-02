import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  
  const ProfileSpaceContext = createContext(null);
  
  export function ProfileSpaceProvider({
    children,
  }) {
    // =========================================
    // SPACE
    // =========================================
  
    const [activeSpace, setActiveSpace] =
      useState("legacy");
  
    // =========================================
    // LEGACY
    // =========================================
  
    const [activeLegacyTab, setActiveLegacyTab] =
      useState("arenas");
  
    // =========================================
    // CIRCLE
    // =========================================
  
    const [activeCircleTab, setActiveCircleTab] =
      useState("friends");
  
    // =========================================
    // SPACE ACTION
    // =========================================
  
    const changeSpace = useCallback((space) => {
      if (
        space !== "legacy" &&
        space !== "circle"
      ) {
        return;
      }
  
      setActiveSpace(space);
    }, []);
  
    // =========================================
    // LEGACY TAB ACTION
    // =========================================
  
    const changeLegacyTab = useCallback((tab) => {
      if (
        tab !== "arenas" &&
        tab !== "stages" &&
        tab !== "spotlights"
      ) {
        return;
      }
  
      setActiveLegacyTab(tab);
    }, []);
  
    // =========================================
    // CIRCLE TAB ACTION
    // =========================================
  
    const changeCircleTab = useCallback((tab) => {
      if (
        tab !== "friends" &&
        tab !== "followers" &&
        tab !== "following"
      ) {
        return;
      }
  
      setActiveCircleTab(tab);
    }, []);
  
    // =========================================
    // VALUE
    // =========================================
  
    const value = useMemo(
      () => ({
        // Space
        activeSpace,
        setActiveSpace,
        changeSpace,
  
        // Legacy
        activeLegacyTab,
        setActiveLegacyTab,
        changeLegacyTab,
  
        // Circle
        activeCircleTab,
        setActiveCircleTab,
        changeCircleTab,
      }),
      [
        activeSpace,
        activeLegacyTab,
        activeCircleTab,
        changeSpace,
        changeLegacyTab,
        changeCircleTab,
      ]
    );
  
    return (
      <ProfileSpaceContext.Provider
        value={value}
      >
        {children}
      </ProfileSpaceContext.Provider>
    );
  }
  
  // =========================================
  // HOOK
  // =========================================
  
  export function useProfileSpace() {
    const context =
      useContext(ProfileSpaceContext);
  
    if (!context) {
      throw new Error(
        "useProfileSpace must be used inside ProfileSpaceProvider"
      );
    }
  
    return context;
  }
  
  export default ProfileSpaceContext;


