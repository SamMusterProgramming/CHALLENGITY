
import React, {
    useMemo,
    useState,
    useCallback,
    useRef,
    useEffect,
  } from "react";
  
  import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Image,
    Animated,
    Modal,
    Alert,
    Pressable,
    Platform,
  } from "react-native";
  
  import { Feather } from "@expo/vector-icons";
  import { useGlobalContext } from "../../../../../../context/GlobalProvider";
  import CountryFlag from "../../../../../common/CountryFlag";
import { removeFollower, unFollowings, unfriendRequest } from "../../../../../../apiCalls/user";

  
  const INITIAL_PAGE_SIZE = 20;
  const PAGE_SIZE = 20;
  
  const COLORS = {
    background: "#090908",
    surface: "#11110F",
    surfaceElevated: "#181713",
    gold: "#DDB765",
    goldBright: "#F0CE83",
    goldDark: "#806537",
    goldWash: "rgba(221,183,101,0.09)",
    text: "#F4F0E8",
    muted: "#999387",
    subtle: "#6E695F",
    border: "#29271F",
    danger: "#DF8D82",
    overlay: "rgba(0,0,0,0.78)",
  };
  
  const TABS = [
    { key: "friends", label: "Friends", icon: "users" },
    { key: "followers", label: "Followers", icon: "user-plus" },
    { key: "following", label: "Following", icon: "user-check" },
  ];
  
  const getPerson = (item) => item?.user ?? item ?? {};
  
  const getCountryInfo = (person) => {
    const country = person?.country;
  
    const code =
      person?.countryCode ||
      person?.country_code ||
      (typeof country === "object" ? country?.code : null) ||
      "";
  
    const name =
      (typeof country === "string" ? country : country?.name) ||
      person?.countryName ||
      "";
  
    return {
      code: String(code).trim().toUpperCase(),
      name,
    };
  };
  
  const getPersonLocation = (person) => {
    const country = getCountryInfo(person).name;
  
    return [
      person?.city,
      person?.region || person?.state || person?.province,
      country,
    ]
      .filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index)
      .join(", ");
  };
  
  const getProfileImage = (person) =>
    person?.profileImage?.publicUrl ||
    person?.profileImage?.cdnUrl ||
    person?.profile_img ||
    null;
  
  const getPersonId = (item, index) =>
    String(item?._id ?? item?.user?._id ?? item?.id ?? index);
  
  const ManageCircle = ({ onPersonAction }) => {
    const {
      user,
      userFriends,
      setUserFriends,
      userFollowers,
      setUserFollowers,
      userFollowings,
      setUserFollowings,
      spacing,
      scale,
    } = useGlobalContext();
  
    const [activeTab, setActiveTab] = useState("friends");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
  
    const scrollY = useRef(new Animated.Value(0)).current;
    const listRef = useRef(null);
  
    const relationships = useMemo(
      () => ({
        friends: Array.isArray(userFriends?.users)
          ? userFriends.users
          : [],
        followers: Array.isArray(userFollowers.users)
          ? userFollowers.users
          : [],
        following: Array.isArray(userFollowings.users)
          ? userFollowings.users
          : [],
      }),
      [userFriends, userFollowers, userFollowings]
    );
  
    const currentRelationships = relationships[activeTab] || [];
    const filteredRelationships = useMemo(() => {
      const query = searchQuery.trim().toLowerCase();
  
      if (!query) return currentRelationships;
  
      return currentRelationships.filter((item) => {
        const person = getPerson(item);
  
        const fields = [
          person?.name,
          person?.username,
          person?.city,
          person?.region,
          person?.state,
          person?.province,
          getCountryInfo(person).name,
        ];
  
        return fields.some((field) =>
          String(field || "").toLowerCase().includes(query)
        );
      });
    }, [currentRelationships, searchQuery]);
  
    const visibleRelationships = useMemo(
      () => filteredRelationships.slice(0, visibleCount),
      [filteredRelationships, visibleCount]
    );
  
    // Reset the list position and collapsed header on tab changes.
    useEffect(() => {
      scrollY.setValue(0);
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }, [activeTab, scrollY]);
  
    const headerHeight = scrollY.interpolate({
      inputRange: [0, scale(52)],
      outputRange: [scale(66), 0],
      extrapolate: "clamp",
    });
  
    const headerOpacity = scrollY.interpolate({
      inputRange: [0, scale(30)],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
  
    const handleTabChange = useCallback((tab) => {
      Keyboard.dismiss();
      setActiveTab(tab);
      setSearchQuery("");
      setVisibleCount(INITIAL_PAGE_SIZE);
      setMenuVisible(false);
      setSelectedPerson(null);
    }, []);
  
    const handleSearchChange = useCallback((value) => {
      setSearchQuery(value);
      setVisibleCount(INITIAL_PAGE_SIZE);
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    }, []);
  
    const handleLoadMore = useCallback(() => {
      setVisibleCount((current) =>
        Math.min(current + PAGE_SIZE, filteredRelationships.length)
      );
    }, [filteredRelationships.length]);
  
    const openPersonMenu = useCallback((item) => {
      Keyboard.dismiss();
      setSelectedPerson(item);
      setMenuVisible(true);
    }, []);
  
    const closePersonMenu = useCallback(() => {
      setMenuVisible(false);
    }, []);
  
    const handlePersonAction = useCallback(
      async(action) => {
        const item = selectedPerson;
        const person = getPerson(item);
  
        if (!item) return;
        
            
        try {
          if(action == "removeFriend"){
          await unfriendRequest(
            user._id ,
            selectedPerson._id,
            setUserFriends
          );
          }
          if(action == "removeFollower"){
            await removeFollower(
              user._id ,
              selectedPerson._id,
              setUserFollowers
            );
            }
          if(action == "unfollow"){
            await unFollowings(
              user._id ,
              selectedPerson._id,
              setUserFollowings
            );
            }
        } catch (error) {
          console.error("unfriendFriend error:", error);
        } finally {
            setMenuVisible(false);
        }
      },
      [selectedPerson, activeTab, onPersonAction]
    );
  
    const actionOptions = useMemo(() => {
      const options = [
        { key: "viewProfile", label: "View profile", icon: "user" },
        {
          key: "message",
          label: "Send a message",
          icon: "message-circle",
        },
      ];
  
      if (activeTab === "friends") {
        options.push({
          key: "removeFriend",
          label: "Unfriend",
          icon: "user-minus",
          danger: true,
        });
      } else if (activeTab === "followers") {
        options.push({
          key: "removeFollower",
          label: "Remove follower",
          icon: "user-minus",
          danger: true,
        });
      } else {
        options.push({
          key: "unfollow",
          label: "Unfollow",
          icon: "user-minus",
          danger: true,
        });
      }
  
      options.push({
        key: "block",
        label: "Block user",
        icon: "slash",
        danger: true,
      });
  
      return options;
    }, [activeTab]);
  
    const renderPerson = useCallback(
      ({ item }) => {
        const person = getPerson(item);
        const imageUri = getProfileImage(person);
        const countryInfo = getCountryInfo(person);
        const location = getPersonLocation(person);
        const username = person?.username
          ? `@${String(person.username).replace(/^@/, "")}`
          : null;
  
        return (
          <View
            style={{
              minHeight: scale(82),
              paddingVertical: spacing(12),
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: COLORS.border,
            }}
          >
            {/* Avatar */}
            <View
              style={{
                width: scale(50),
                height: scale(50),
                borderRadius: scale(25),
                padding: 2,
                marginRight: spacing(13),
                backgroundColor: COLORS.goldWash,
                borderWidth: 1,
                borderColor: COLORS.goldDark,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: scale(24),
                  overflow: "hidden",
                  backgroundColor: COLORS.surfaceElevated,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <Feather
                    name="user"
                    size={scale(21)}
                    color={COLORS.gold}
                  />
                )}
              </View>
            </View>
  
            {/* Identity */}
            <View
              style={{
                flex: 1,
                minWidth: 0,
                justifyContent: "center",
                paddingRight: spacing(8),
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: COLORS.text,
                  fontSize: scale(13),
                  fontWeight: "700",
                  letterSpacing: 0.15,
                }}
              >
                {person?.name || "Unknown"}
              </Text>
  
              {/* {username ? (
                <Text
                  numberOfLines={1}
                  style={{
                    color: COLORS.gold,
                    fontSize: scale(10),
                    marginTop: spacing(3),
                  }}
                >
                  {username}
                </Text>
              ) : null} */}
  
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: spacing(8),
                  minWidth: 0,
                }}
              >
                {/* <Feather
                  name="map-pin"
                  size={scale(10)}
                  color={COLORS.subtle}
                  style={{ marginRight: spacing(4) }}
                /> */}
  
                <Text
                  numberOfLines={1}
                  style={{
                    flexShrink: 1,
                    color: COLORS.muted,
                    fontSize: scale(10),
                  }}
                >
                  {location || "Location unavailable"}
                </Text>
  
                {item.country.length === 2 ? (
                  <View
                    style={{
                      marginLeft: spacing(7),
                      overflow: "hidden",
                      borderRadius: 2,
                    }}
                  >
                    <CountryFlag  code = {item.country} size={14} />
                  </View>
                ) : null}
              </View>
            </View>
  
            {/* More actions */}
            <TouchableOpacity
              onPress={() => openPersonMenu(item)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Actions for ${person?.name || "user"}`}
              style={{
                width: scale(38),
                height: scale(38),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(12),
                borderWidth: 1,
                borderColor: COLORS.border,
                backgroundColor: COLORS.surface,
              }}
            >
              <Feather
                name="more-horizontal"
                size={scale(19)}
                color={COLORS.gold}
              />
            </TouchableOpacity>
          </View>
        );
      },
      [scale, spacing, openPersonMenu]
    );
  
    const renderEmptyState = useCallback(() => {
      const hasSearch = searchQuery.trim().length > 0;
  
      return (
        <View
          style={{
            flexGrow: 1,
            minHeight: scale(230),
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: spacing(28),
            paddingVertical: spacing(30),
          }}
        >
          <View
            style={{
              width: scale(60),
              height: scale(60),
              borderRadius: scale(30),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.goldWash,
              borderWidth: 1,
              borderColor: COLORS.goldDark,
              marginBottom: spacing(18),
            }}
          >
            <Feather
              name={hasSearch ? "search" : "users"}
              size={scale(23)}
              color={COLORS.gold}
            />
          </View>
  
          <Text
            style={{
              color: COLORS.goldBright,
              fontSize: scale(11),
              fontWeight: "700",
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            {hasSearch ? "NO MATCHES FOUND" : "YOUR CIRCLE AWAITS"}
          </Text>
  
          <Text
            style={{
              color: COLORS.muted,
              fontSize: scale(12),
              lineHeight: scale(19),
              textAlign: "center",
              marginTop: spacing(9),
            }}
          >
            {hasSearch
              ? "Try another name, username, or location."
              : `Your ${activeTab} will appear here.`}
          </Text>
        </View>
      );
    }, [searchQuery, activeTab, scale, spacing]);
  
    const selectedPersonData = getPerson(selectedPerson);
    const selectedImage = getProfileImage(selectedPersonData);
    const selectedCountry = getCountryInfo(selectedPersonData);
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}
      >
        {/* Collapsible introduction */}
        <Animated.View
          pointerEvents="none"
          style={{
            height: headerHeight,
            opacity: headerOpacity,
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: spacing(6),
            }}
          >
            <View
              style={{
                width: scale(20),
                height: 1,
                backgroundColor: COLORS.gold,
                marginRight: spacing(8),
              }}
            />
  
            <Text
              style={{
                color: COLORS.gold,
                fontSize: scale(9),
                fontWeight: "700",
                letterSpacing: 2.4,
              }}
            >
              YOUR NETWORK
            </Text>
          </View>
  
          <Text
            style={{
              color: COLORS.text,
              fontSize: scale(20),
              fontWeight: "700",
              letterSpacing: -0.5,
            }}
          >
            Manage Circle
          </Text>
  
          {/* <Text
            style={{
              color: COLORS.muted,
              fontSize: scale(11),
              marginTop: spacing(4),
            }}
          >
            The people who make your world.
          </Text> */}
        </Animated.View>
  
        {/* Relationship tabs */}
        <View
          style={{
            flexDirection: "row",
            padding: spacing(4),
            marginTop: spacing(12),
            borderRadius: scale(14),
            borderWidth: 1,
            borderColor: COLORS.border,
            backgroundColor: COLORS.surface,
          }}
        >
          {TABS.map((tab) => {
            const selected = activeTab === tab.key;
  
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handleTabChange(tab.key)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={{
                  flex: 1,
                  minHeight: scale(42),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing(5),
                  paddingHorizontal: spacing(3),
                  borderRadius: scale(10),
                  backgroundColor: selected
                    ? COLORS.goldWash
                    : "transparent",
                  borderWidth: selected ? 1 : 0,
                  borderColor: selected
                    ? COLORS.goldDark
                    : "transparent",
                }}
              >
                <Feather
                  name={tab.icon}
                  size={scale(13)}
                  color={selected ? COLORS.goldBright : COLORS.muted}
                />
  
                <Text
                  numberOfLines={1}
                  style={{
                    color: selected ? COLORS.goldBright : COLORS.muted,
                    fontSize: scale(10),
                    fontWeight: selected ? "700" : "500",
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
  
        {/* Search */}
        <View
          style={{
            minHeight: scale(45),
            flexDirection: "row",
            alignItems: "center",
            marginTop: spacing(25),
            paddingHorizontal: spacing(13),
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: scale(12),
            backgroundColor: COLORS.surface,
          }}
        >
          <Feather
            name="search"
            size={scale(16)}
            color={COLORS.gold}
          />
  
          <TextInput
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder={`Search ${activeTab}...`}
            placeholderTextColor={COLORS.subtle}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel={`Search ${activeTab}`}
            selectionColor={COLORS.gold}
            style={{
              flex: 1,
              color: COLORS.text,
              fontSize: scale(12),
              paddingVertical: Platform.OS === "ios"
                ? spacing(12)
                : spacing(8),
              paddingHorizontal: spacing(10),
            }}
          />
  
          {!!searchQuery && (
            <TouchableOpacity
              onPress={() => handleSearchChange("")}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              hitSlop={8}
              style={{ padding: spacing(4) }}
            >
              <Feather
                name="x-circle"
                size={scale(16)}
                color={COLORS.muted}
              />
            </TouchableOpacity>
          )}
        </View>
  
        {/* List heading and count */}
        <View
          style={{
            minHeight: scale(48),
            paddingHorizontal: spacing(2),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: spacing(7),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing(7),
            }}
          >
            {/* <View
              style={{
                width: scale(3),
                height: scale(15),
                borderRadius: 2,
                backgroundColor: COLORS.gold,
              }}
            /> */}
  
            <Text
              style={{
                color: COLORS.text,
                fontSize: scale(10),
                fontWeight: "700",
                letterSpacing: 1.5,
              }}
            >
              {activeTab.toUpperCase()}
            </Text>
          </View>
  
          <View
            style={{
            //   paddingHorizontal: spacing(10),
            //   paddingVertical: spacing(5),
            //   borderRadius: scale(20),
            //   backgroundColor: COLORS.surfaceElevated,
            //   borderWidth: 1,
            //   borderColor: COLORS.border,
            }}
          >
            <Text
              style={{
                color: COLORS.gold,
                fontSize: scale(10),
                fontWeight: "600",
              }}
            >
              {filteredRelationships.length}{" "}
              {filteredRelationships.length === 1 ? "person" : "people"}
            </Text>
          </View>
        </View>
  
        {/* Virtualized list */}
        <Animated.FlatList
          ref={listRef}
          key={activeTab}
          data={visibleRelationships}
          keyExtractor={getPersonId}
          renderItem={renderPerson}
          ListEmptyComponent={renderEmptyState}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: spacing(30),
            flexGrow: 1,
          }}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={7}
          removeClippedSubviews={Platform.OS === "android"}
        />
  
        {/* Person action sheet */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={closePersonMenu}
        >
          <Pressable
            onPress={closePersonMenu}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: COLORS.overlay,
            }}
          >
            <Pressable
              onPress={() => {}}
              style={{
                paddingHorizontal: spacing(20),
                paddingTop: spacing(12),
                paddingBottom: spacing(30),
                borderTopLeftRadius: scale(26),
                borderTopRightRadius: scale(26),
                borderWidth: 1,
                borderBottomWidth: 0,
                borderColor: COLORS.goldDark,
                backgroundColor: COLORS.surface,
              }}
            >
              {/* Handle */}
              <View
                style={{
                  width: scale(38),
                  height: scale(4),
                  borderRadius: 3,
                  alignSelf: "center",
                  backgroundColor: COLORS.goldDark,
                  marginBottom: spacing(22),
                }}
              />
  
              {/* Selected person */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: spacing(20),
                }}
              >
                <View
                  style={{
                    width: scale(48),
                    height: scale(48),
                    borderRadius: scale(24),
                    padding: 2,
                    borderWidth: 1,
                    borderColor: COLORS.goldDark,
                    marginRight: spacing(12),
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderRadius: scale(22),
                      overflow: "hidden",
                      backgroundColor: COLORS.surfaceElevated,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedImage ? (
                      <Image
                        source={{ uri: selectedImage }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Feather
                        name="user"
                        size={scale(20)}
                        color={COLORS.gold}
                      />
                    )}
                  </View>
                </View>
  
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    style={{
                      color: COLORS.gold,
                      fontSize: scale(9),
                      fontWeight: "700",
                      letterSpacing: 1.8,
                      marginBottom: spacing(5),
                    }}
                  >
                    CONNECTION
                  </Text>
  
                  <Text
                    numberOfLines={1}
                    style={{
                      color: COLORS.text,
                      fontSize: scale(15),
                      fontWeight: "700",
                    }}
                  >
                    {selectedPersonData?.name || "Manage connection"}
                  </Text>
  
                  {!!selectedCountry.name && (
                    <Text
                      numberOfLines={1}
                      style={{
                        color: COLORS.muted,
                        fontSize: scale(10),
                        marginTop: spacing(4),
                      }}
                    >
                      {selectedCountry.name}
                    </Text>
                  )}
                </View>
              </View>
  
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.border,
                  marginBottom: spacing(5),
                }}
              />
  
              {actionOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => {
                    if (
                      option.key === "block" ||
                      option.key === "removeFriend" ||
                      option.key === "removeFollower" ||
                      option.key === "unfollow"
                    ) {
                      Alert.alert(
                        option.label,
                        `Are you sure you want to ${option.label.toLowerCase()} ${
                          selectedPersonData?.name || "this person"
                        }?`,
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "Continue",
                            style: "destructive",
                            onPress: () =>
                              handlePersonAction(option.key),
                          },
                        ]
                      );
                      return;
                    }
  
                    handlePersonAction(option.key);
                  }}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  style={{
                    minHeight: scale(49),
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: spacing(10),
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.border,
                  }}
                >
                  <View
                    style={{
                      width: scale(34),
                      height: scale(34),
                      borderRadius: scale(10),
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: option.danger
                        ? "rgba(223,141,130,0.08)"
                        : COLORS.goldWash,
                      marginRight: spacing(12),
                    }}
                  >
                    <Feather
                      name={option.icon}
                      size={scale(16)}
                      color={
                        option.danger ? COLORS.danger : COLORS.gold
                      }
                    />
                  </View>
  
                  <Text
                    style={{
                      flex: 1,
                      color: option.danger
                        ? COLORS.danger
                        : COLORS.text,
                      fontSize: scale(12),
                      fontWeight: "500",
                    }}
                  >
                    {option.label}
                  </Text>
  
                  <Feather
                    name="chevron-right"
                    size={scale(16)}
                    color={COLORS.subtle}
                  />
                </TouchableOpacity>
              ))}
  
              <TouchableOpacity
                onPress={closePersonMenu}
                activeOpacity={0.8}
                style={{
                  minHeight: scale(45),
                  marginTop: spacing(17),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: scale(12),
                  borderWidth: 1,
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.surfaceElevated,
                }}
              >
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: scale(12),
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    );
  };
  
  export default ManageCircle;
  