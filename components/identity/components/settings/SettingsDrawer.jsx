import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  
  import {
    Animated,
    BackHandler,
    Pressable,
    View,
    useWindowDimensions,
    PanResponder,
  } from "react-native";
  
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { useGlobalContext } from "../../../../context/GlobalProvider";
  
  import SettingsHeader from "./components/SettingsHeader";
  import SettingsMenu from "./components/SettingsMenu";
import EditProfile from "./components/editProfile";
import { updateUserInfo } from "../../../../apiCalls";
import Appearance from "./components/Appearance";
import ManageCircle from "./components/circle/ManageCircle";
import { logoutUser } from "../../../../services/userServices";
import { router } from "expo-router";
  
  const BACKGROUND = "#08090B";

 
  
  
  
  export default function SettingsDrawer({
    visible = false,
    onClose,
    children,
  }) {

    const insets = useSafeAreaInsets();
    const { width: screenWidth } = useWindowDimensions();
    const { spacing , user , setUser } = useGlobalContext();
  
    const drawerWidth = screenWidth;
  
    const translateX = useRef(
      new Animated.Value(drawerWidth)
    ).current;
  
    const backdropOpacity = useRef(
      new Animated.Value(0)
    ).current;
  
    const [mounted, setMounted] = useState(visible);
    const [activeScreen, setActiveScreen] = useState(null);
  
    const isClosing = useRef(false);
  
 

    //actions 
    const handleSave = async(updateInfo) => {
        await updateUserInfo(user._id, updateInfo, setUser);
      };


    const SETTINGS_SCREENS = {
        editProfile: {
            title: "EDIT PROFILE",
            subtitle: "Manage your personal details.",
            component: EditProfile,
            props: {
                onSave : handleSave,
                setActiveScreen : setActiveScreen
              },
          },
          appearance: {
            title: "PROFILE APPEARANCE",
            subtitle: "Personalize your profile.",
            component: Appearance,
          },
        circle: {
          title: "MANAGE CIRCLE",
          subtitle: "Your friends and connections.",
          component: ManageCircle,
        },
        talent: {
          title: "ARENAS & STAGES",
          subtitle: "Your talent journey.",
          component: null,
        },
        privacy: {
          title: "PRIVACY & SECURITY",
          subtitle: "Manage your account security.",
          component: null,
        },
        preferences: {
          title: "PREFERENCES",
          subtitle: "Customize your ITRI experience.",
          component: null,
        },
        help: {
          title: "HELP & SUPPORT",
          subtitle: "We're here to help.",
          component: null,
        },
      };

    const currentScreen = activeScreen
      ? SETTINGS_SCREENS[activeScreen]
      : null;
  
    const openAnimation = useCallback(() => {
      isClosing.current = false;
  
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          damping: 28,
          stiffness: 240,
          mass: 0.85,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }, [backdropOpacity, translateX]);
  
    const closeDrawer = useCallback(() => {
      if (isClosing.current) return;
  
      isClosing.current = true;
  
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: drawerWidth,
          duration: 240,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setMounted(false);
          setActiveScreen(null);
          isClosing.current = false;
          onClose?.();
        }
      });
    }, [backdropOpacity, drawerWidth, onClose, translateX]);
  
    const goBackToMenu = useCallback(() => {
      setActiveScreen(null);
    }, []);
  
    const handleSelectItem = useCallback((screenId) => {
      if (SETTINGS_SCREENS[screenId]) {
        setActiveScreen(screenId);
      }
    }, []);
  
    useEffect(() => {
      if (visible) {
        setMounted(true);
        setActiveScreen(null);
        translateX.setValue(drawerWidth);
        backdropOpacity.setValue(0);
  
        requestAnimationFrame(openAnimation);
      } else {
        setMounted(false);
        setActiveScreen(null);
        translateX.setValue(drawerWidth);
        backdropOpacity.setValue(0);
        isClosing.current = false;
      }
    }, [
      visible,
      drawerWidth,
      translateX,
      backdropOpacity,
      openAnimation,
    ]);
  
    useEffect(() => {
      if (!visible || !mounted) return;
  
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (activeScreen) {
            goBackToMenu();
          } else {
            closeDrawer();
          }
  
          return true;
        }
      );
  
      return () => subscription.remove();
    }, [
      visible,
      mounted,
      activeScreen,
      goBackToMenu,
      closeDrawer,
    ]);
  
    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onMoveShouldSetPanResponder: (_, gesture) =>
            gesture.dx > 10 &&
            Math.abs(gesture.dx) >
              Math.abs(gesture.dy) * 1.25,
  
          onPanResponderMove: (_, gesture) => {
            if (gesture.dx > 0) {
              translateX.setValue(
                Math.min(gesture.dx, drawerWidth)
              );
            }
          },
  
          onPanResponderRelease: (_, gesture) => {
            const shouldClose =
              gesture.dx > drawerWidth * 0.22 ||
              gesture.vx > 0.8;
  
            if (shouldClose) {
              closeDrawer();
            } else {
              Animated.spring(translateX, {
                toValue: 0,
                damping: 25,
                stiffness: 260,
                useNativeDriver: true,
              }).start();
            }
          },
  
          onPanResponderTerminate: () => {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        }),
      [closeDrawer, drawerWidth, translateX]
    );

    const logOut = async () => {
      { 
        await logoutUser(setUser, router , user)
      }
    }
  
    if (!mounted) return null;
  
    const ActiveScreen = currentScreen?.component;
  
    return (
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          elevation: 999,
        }}
      >
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#000000",
            opacity: backdropOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.68],
            }),
          }}
        />
  
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close settings"
          onPress={closeDrawer}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 0,
          }}
        />
  
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: BACKGROUND,
            overflow: "hidden",
            transform: [{ translateX }],
          }}
        >
          <SettingsHeader
            title={currentScreen?.title || "SETTINGS"}
            subtitle={
              currentScreen?.subtitle ||
              "Shape your ITRI experience."
            }
            onClose={closeDrawer}
            onBack={goBackToMenu}
            showBack={Boolean(activeScreen)}
          />
  
          <View
            style={{
              flex: 1,
              paddingHorizontal: spacing(24),
              paddingTop: spacing(8),
              paddingBottom: Math.max(
                insets.bottom,
                spacing(20)
              ),
            }}
          >
            {children ? (
              children
            ) : activeScreen ? (
              ActiveScreen ? <ActiveScreen {...currentScreen.props} />: null
            ) : (
              <SettingsMenu onSelectItem={handleSelectItem} onLogout = {logOut} />
            )}
          </View>
        </Animated.View>
      </View>
    );
  }