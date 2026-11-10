

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  useWindowDimensions,
  Animated
} from "react-native";

// import Animated from "react-native/Libraries/Animated/Animated";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { useGlobalContext } from "../context/GlobalProvider";
import { useLoading } from "../context/loadingContext";

import {
  getCompletedUploads,
  isUploadQueueBusy,
  removeUploadJob,
  subscribeToUploadQueue,
  UPLOAD_TYPE,
} from "../services/uploads";

import {
  deleteArenaByUser,
  deleteArenaPost,
  getArenaById,
  toggleFollowerArena,
  toggleStarArena,
  updateArenaByUser,
} from "../apiCalls/arenas";

import Header from "../components/arenaProfile/header/header";
import ArenaAlertModal from "../components/arena/modals/AlertArenaModal";
import { ArenaMenu } from "../components/arenaProfile/arenaMenu";
import EditArenaModal from "../components/arenaProfile/modals/editArenaModal";
import { ArenaHero } from "../components/arenaProfile/arenaHero/arenaHero";
import PerformanceDisplayer from "../components/arenaProfile/performance/performanceDisplayer";

const GOLD = "#E6C66A";
const GOLD_DARK = "#B8943D";
const BACKGROUND = "#080909";
const SURFACE = "#141515";
const MUTED = "#929598";
const BORDER = "rgba(230,198,106,0.15)";

const formatCount = (value = 0) => {
  const n = Number(value) || 0;

  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;

  return String(n);
};


/* -------------------------------------------------------------------------- */
/* Posts section heading                                                       */
/* -------------------------------------------------------------------------- */

const ArenaPostsHeading = memo(function ArenaPostsHeading({
  count,
  scale,
}) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 21,
        paddingBottom: 8,
        backgroundColor: BACKGROUND,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              color: "#F6F3EA",
              fontSize: scale(20),
              fontWeight: "900",
              letterSpacing: -0.3,
            }}
          >
            Performances
          </Text>

          <Text
            style={{
              color: MUTED,
              fontSize: scale(11),
              marginTop: 5,
            }}
          >
            Moments worth remembering
          </Text>
        </View>

        <View
          style={{
            minWidth: 39,
            height: 33,
            paddingHorizontal: 10,
            borderRadius: 11,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(230,198,106,0.09)",
            borderWidth: 1,
            borderColor: BORDER,
          }}
        >
          <Text
            style={{
              color: GOLD,
              fontSize: scale(12),
              fontWeight: "800",
            }}
          >
            {count}
          </Text>
        </View>
      </View>
    </View>
  );
});

/* -------------------------------------------------------------------------- */
/* Empty state                                                                 */
/* -------------------------------------------------------------------------- */

const EmptyPerformances = memo(function EmptyPerformances({
  isMe,
  onCreate,
  scale,
}) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 15,
        marginBottom: 35,
        paddingHorizontal: 22,
        paddingVertical: 32,
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: SURFACE,
        borderWidth: 1,
        borderColor: BORDER,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 21,
          backgroundColor: "rgba(230,198,106,0.09)",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: BORDER,
        }}
      >
        <MaterialCommunityIcons
          name="movie-open-outline"
          size={30}
          color={GOLD}
        />
      </View>

      <Text
        style={{
          color: "#F5F1E8",
          fontSize: scale(17),
          fontWeight: "800",
          marginTop: 17,
        }}
      >
        No performances yet
      </Text>

      <Text
        style={{
          color: MUTED,
          fontSize: scale(12),
          lineHeight: scale(19),
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {isMe
          ? "Your arena story starts here. Add a performance to share the first moment."
          : "There are no performances to show here yet. Check back soon."}
      </Text>

      {isMe && (
        <TouchableOpacity
          onPress={onCreate}
          activeOpacity={0.8}
          style={{
            marginTop: 20,
            backgroundColor: GOLD,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 13,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="plus"
            size={19}
            color="#17130A"
          />
          <Text
            style={{
              marginLeft: 7,
              color: "#17130A",
              fontWeight: "800",
              fontSize: scale(12),
            }}
          >
            Add performance
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

/* -------------------------------------------------------------------------- */
/* Arena page                                                                  */
/* -------------------------------------------------------------------------- */

export default function ArenaPage() {
  const {
    user,
    arenaActionModal,
    setUploadPerformanceLoading,
    uploadPerformanceLoading,
    openArenaAlertModal,
    setOpenArenaAlertModal,
    globalArenaRefresh,
    setGlobalArenaRefresh,
    setUserArenas,
    setArenaActionModal,
    setSelectedArena,
    scale,
    
  } = useGlobalContext();

  const { showLoading, hideLoading } = useLoading();
  const { arena_id } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const listRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [arena, setArena] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const [loadingArena, setLoadingArena] = useState(true);
  const [arenaError, setArenaError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [savingArena, setSavingArena] = useState(false);

  const [showArenaMenu, setShowArenaMenu] = useState(false);
  const [openEditArenaModal, setOpenEditArenaModal] = useState(false);
  const [showMenuPostId, setShowMenuPostId] = useState(null);
  const [postToDeleteId, setPostToDeleteId] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [playerPosts, setPlayerPosts] = useState([]);

  const [headerBlack, setHeaderBlack] = useState(false);

  const THRESHOLD = height / 12;

  /* Load arena */

  const loadArena = useCallback(
    async (isRefresh = false) => {
      if (!user?._id || !arena_id) {
        setLoadingArena(false);
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoadingArena(true);

      try {
        setArenaError(false);

        const data = await getArenaById(user._id, arena_id);

        if (!data) {
          setArenaError(true);
          return;
        }

        setArena(data);
        setIsMe(String(data.owner_id) === String(user._id));
      } catch (error) {
        console.error("Failed to load arena:", error);
        setArenaError(true);
      } finally {
        setLoadingArena(false);
        setRefreshing(false);
      }
    },
    [user?._id, arena_id]
  );

  useEffect(() => {
    loadArena();
  }, [loadArena]);

  const onRefresh = useCallback(async () => {
    await loadArena(true);
  }, [loadArena]);

  /* Scroll-aware top bar */

  const handleScroll = useCallback(
    (event) => {
      const y = event.nativeEvent.contentOffset.y;

      scrollY.setValue(y);

      setHeaderBlack((previous) => {
        if (y >= THRESHOLD && !previous) return true;
        if (y < THRESHOLD && previous) return false;
        return previous;
      });
    },
    [THRESHOLD, scrollY]
  );

  /* Follow / star */

  const toggleFollower = useCallback(async () => {
    if (!arena || !user?._id) return;

    try {
      const response = await toggleFollowerArena({
        arenaId: arena._id,
        userId: user._id,
        userName: user.name,
      });

      setArena((previous) => ({
        ...response,
        isStarred: previous?.isStarred,
      }));
    } catch (error) {
      console.error("Failed to toggle arena follow:", error);
    }
  }, [arena, user?._id, user?.name]);

  const toggleStar = useCallback(async () => {
    if (!arena || !user?._id) return;

    try {
      const response = await toggleStarArena({
        arenaId: arena._id,
        userId: user._id,
        userName: user.name,
      });

      setArena((previous) => ({
        ...response,
        isFollower: previous?.isFollower,
      }));
    } catch (error) {
      console.error("Failed to toggle arena star:", error);
    }
  }, [arena, user?._id, user?.name]);

  /* Navigation */

  const loadProfile = useCallback(
    (ownerId) => {
      if (!ownerId || !arena?._id) return;

      router.push({
        pathname: "/ProfileScreen",
        params: {
          profile_id: ownerId,
          arena_id: arena._id,
        },
      });
    },
    [arena?._id]
  );

  const createPerformance = useCallback(() => {
    if (!arena?._id) return;

    router.push({
      pathname: "/CreatePerformance",
      params: {
        arena_id: arena._id,
        region: arena.region,
      },
    });
  }, [arena]);

  const openPerformance = useCallback(
    (post) => {
      if (!post || !arena) return;

      setSelectedPost(post);
      setShowMenuPostId(null);

      const posts = (arena.posts ?? []).map((p) => ({
        ...p,
        arenaName: arena.arenaName,
        talentType: arena.talentType,
        region: arena.region,
        profileImage: arena.profileImage,
      }));

      const selected = posts.find(
        (p) => String(p._id) === String(post._id)
      );

      const reorderedPosts = selected
        ? [
            selected,
            ...posts.filter(
              (p) => String(p._id) !== String(post._id)
            ),
          ]
        : posts;

      setPlayerPosts(reorderedPosts);

      router.push({
        pathname: "/arenaPerformancePlayer",
        params: {
          selectedPostId: post._id,
          arenaPosts: JSON.stringify(reorderedPosts),
          arena: JSON.stringify([]),
        },
      });
    },
    [arena]
  );

  /* Delete arena / performance */

  const handleDeleteArena = useCallback(async () => {
    if (!arena?._id || !user?._id) return;

    try {
      showLoading("Deleting arena...");

      const data = await deleteArenaByUser(arena._id, {
        userId: user._id,
      });

      if (data?.arenas) setUserArenas(data.arenas);

      setOpenArenaAlertModal(false);
      router.back();
    } catch (error) {
      console.error("Failed to delete arena:", error);
    } finally {
      hideLoading();
    }
  }, [arena?._id, user?._id]);

  const deletePost = useCallback(async () => {
    if (!postToDeleteId) return;

    try {
      showLoading("Deleting performance...");

      await deleteArenaPost(
        postToDeleteId,
        setArena,
        setUserArenas
      );

      setPostToDeleteId(null);
      setOpenArenaAlertModal(false);
    } catch (error) {
      console.error("Failed to delete performance:", error);
    } finally {
      hideLoading();
    }
  }, [postToDeleteId]);

  /* Update arena */

  const updateArena = useCallback(
    async (body) => {
      if (!arena?._id || !user?._id || savingArena) return;
      setSavingArena(true);
      try {
        const data = await updateArenaByUser(arena._id, {
          ...body,
          userId: user._id,
        });

        if (!data?.selectedArena) {
          throw new Error("Arena update returned no arena data.");
        }

        setArena(data.selectedArena);
        setSelectedArena(data.selectedArena);

        if (Array.isArray(data.arenas)) {
          setUserArenas(data.arenas);
        }

        setOpenEditArenaModal(false);
      } catch (error) {
        console.error("Failed to update arena:", error);
        throw error;
      } finally {
        setSavingArena(false);
      }
    },
    [arena?._id, user?._id, savingArena, setSelectedArena, setUserArenas]
  );

  /* Confirmation modal configuration */

  const confirmAction = useMemo(
    () => ({
      delete_arena: handleDeleteArena,
      delete_arena_deny: () => {},
      create_performance: createPerformance,
      delete_performance: deletePost,
    }),
    [handleDeleteArena, createPerformance, deletePost]
  );

  const alertContent = {
    delete_arena: {
      title: "Delete Arena",
      text:
        "Deleting this arena will permanently remove all performances, followers, stars and statistics. This action cannot be undone.",
    },
    delete_arena_deny: {
      title: "Delete Arena",
      text: "You cannot delete this arena until all performances are deleted.",
    },
    create_arena: {
      title: "Create Arena",
      text: "Are you sure you want to create a new arena?",
    },
    create_performance: {
      title: "Add Performance",
      text: "Are you sure you want to add a performance?",
    },
    delete_performance: {
      title: "Delete Performance",
      text: "Are you sure you want to delete this performance?",
    },
  };

  const alertType = {
    delete_arena: "confirm",
    delete_arena_deny: "infos",
    create_arena: "confirm",
    create_performance: "confirm",
    delete_performance: "confirm",
  };

  /* Upload queue subscriptions */

  useEffect(() => {
    const unsubscribe = subscribeToUploadQueue(
      ({ event, job, busy, result, error }) => {
        if (busy) setUploadPerformanceLoading(true);

        if (event === "job_completed") {
          const performanceResult = result ?? job?.result;

          if (job?.type === UPLOAD_TYPE.PERFORMANCE) {
            setUploadPerformanceLoading(false);

            if (performanceResult) {
              setArena(performanceResult.selectedArena);

              if (performanceResult.arenas) {
                setUserArenas(performanceResult.arenas);
              }
            }
            setGlobalArenaRefresh(true);
          }
          return;
        }

        if (
          event === "job_failed" &&
          job?.type === UPLOAD_TYPE.PERFORMANCE
        ) {
          console.error(
            "Performance upload failed:",
            error ?? job?.error
          );

          setUploadPerformanceLoading(false);
        }
        if (
          event === "job_cancelled" &&
          job?.type === UPLOAD_TYPE.PERFORMANCE
        ) {
          setUploadPerformanceLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkUploadQueue = async () => {
      try {
        const busy = await isUploadQueueBusy();

        if (mounted) setUploadPerformanceLoading(busy);
      } catch (error) {
        console.error("Failed to check upload queue:", error);
      }
    };

    checkUploadQueue();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const recoverCompletedUploads = async () => {
      try {
        const completedUploads = await getCompletedUploads();
        for (const job of completedUploads) {
          if (job.type !== UPLOAD_TYPE.PERFORMANCE) continue;
          const result = job.result;
          if (!result) continue;
          if (!mounted) return;
          if (
            String(result.selectedArena?._id) === String(arena_id)
          ) {
            setArena(result.selectedArena);
          }
          if (result.arenas) setUserArenas(result.arenas);
          setUploadPerformanceLoading(false);
          setGlobalArenaRefresh(true);
          await removeUploadJob(job.id);
        }
      } catch (error) {
        console.error("Failed to recover completed upload:", error);
      }
    };

    recoverCompletedUploads();

    return () => {
      mounted = false;
    };
  }, [arena_id]);

  useEffect(() => {
    if (!globalArenaRefresh) return;
    loadArena(true);
    setGlobalArenaRefresh(false);
  }, [globalArenaRefresh, loadArena, setGlobalArenaRefresh]);

  /* One flat list, with explicit section rows */

  const posts = arena?.posts ?? [];

  const listData = useMemo(() => {
    const rows = [
      {
        type: "hero",
        key: "arena-hero",
      },
      {
        type: "posts-heading",
        key: "arena-posts-heading",
      },
    ];

    if (posts.length === 0) {
      rows.push({
        type: "empty",
        key: "arena-empty-state",
      });
    } else {
      posts.forEach((post) => {
        rows.push({
          type: "post",
          key: `post-${post._id}`,
          post,
        });
      });
    }

    return rows;
  }, [posts]);

  const renderItem = useCallback(
    ({ item }) => {
      switch (item.type) {
        case "hero":
          return (
            <ArenaHero
              arena={arena}
              isMe={isMe}
              scale={scale}
              uploadPerformanceLoading= {uploadPerformanceLoading}
              setArenaActionModal = {setArenaActionModal}
              setOpenArenaAlertModal={setOpenArenaAlertModal}
              onPressFollow={toggleFollower}
              onPressStar={toggleStar}
              onPressOwner={loadProfile}
            />
          );

        case "posts-heading":
          return (
            <ArenaPostsHeading
              count={posts.length}
              scale={scale}
            />
          );

        case "empty":
          return (
            <EmptyPerformances
              isMe={isMe}
              onCreate={createPerformance}
              scale={scale}
            />
          );

        case "post":
          return (
            <PerformanceDisplayer
              item={item.post}
              arena={arena}
              setPostToDeleteId={setPostToDeleteId}
              setSelectedPost={setSelectedPost}
              onPress={openPerformance}
              onRefresh={onRefresh}
              showMenuPostId={showMenuPostId}
              setShowMenuPostId={setShowMenuPostId}
              isMe={isMe}
            />
          );

        default:
          return null;
      }
    },
    [
      arena,
      isMe,
      scale,
      toggleFollower,
      toggleStar,
      loadProfile,
      posts.length,
      createPerformance,
      openPerformance,
      onRefresh,
      showMenuPostId,
    ]
  );

  const keyExtractor = useCallback((item) => item.key, []);

  /* Loading and error screens */

  if (loadingArena && !arena) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: BACKGROUND,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={GOLD} />

        <Text
          style={{
            color: MUTED,
            fontSize: scale(12),
            marginTop: 14,
          }}
        >
          Loading arena...
        </Text>
      </View>
    );
  }

  if (arenaError && !arena) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: BACKGROUND,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={42}
          color={GOLD}
        />

        <Text
          style={{
            color: "#F5F1E8",
            fontSize: scale(18),
            fontWeight: "800",
            marginTop: 14,
          }}
        >
          Unable to load arena
        </Text>

        <Text
          style={{
            color: MUTED,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Check your connection and try again.
        </Text>

        <TouchableOpacity
          onPress={() => loadArena()}
          style={{
            marginTop: 20,
            paddingHorizontal: 22,
            paddingVertical: 12,
            borderRadius: 12,
            backgroundColor: GOLD,
          }}
        >
          <Text style={{ color: "#17130A", fontWeight: "800" }}>
            Try again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!arena) return null;

  return (
    <View style={{ flex: 1, backgroundColor: BACKGROUND }}>
      {/* Single scroll owner. Hero and sections are regular list rows. */}
      <Animated.FlatList
        ref={listRef}
        data={listData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        extraData={{
          arenaId: arena._id,
          isMe,
          showMenuPostId,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={GOLD}
            colors={[GOLD]}
            progressViewOffset={insets.top + 55}
          />
        }
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 18) + 18,
        }}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews={false}
      />

      {/* Fixed navigation, outside the scrolling list */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          elevation: 20,
          paddingTop: insets.top,
          paddingHorizontal: 16,
          paddingBottom: 8,
          backgroundColor: headerBlack
            ? "rgba(8,9,9,0.98)"
            : "rgba(8,9,9,0.14)",
          borderBottomWidth: headerBlack ? 1 : 0,
          borderBottomColor: BORDER,
        }}
      >
        <View
          style={{
            height: 45,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.75}
            accessibilityLabel="Go back"
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={GOLD}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingHorizontal: 8,
            }}
          >
            {headerBlack && (
              <Text
                numberOfLines={1}
                style={{
                  color: "#F5F1E8",
                  fontSize: scale(14),
                  fontWeight: "800",
                }}
              >
                {arena.arenaName}
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setShowArenaMenu((previous) => !previous)}
            accessibilityLabel="Arena options"
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={25}
              color={GOLD}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Existing arena menu */}
      {showArenaMenu && (
        <ArenaMenu
          arena={arena}
          setShowArenaMenu={setShowArenaMenu}
          setOpenEditArenaModal={setOpenEditArenaModal}
          setArenaActionModal={setArenaActionModal}
          setOpenArenaAlertModal={setOpenArenaAlertModal}
        />
      )}

      {/* Existing edit modal */}
      {openEditArenaModal && (
        <EditArenaModal
          isVisible={openEditArenaModal}
          setIsVisible={setOpenEditArenaModal}
          arena={arena}
          width={width}
          height={height}
          onSave={updateArena}
        />
      )}

      {/* Existing confirmation modal */}
      {openArenaAlertModal && (
        <ArenaAlertModal
          isVisible={openArenaAlertModal}
          setIsVisible={setOpenArenaAlertModal}
          title={
            alertContent[arenaActionModal]?.title ?? "Confirm action"
          }
          message={
            alertContent[arenaActionModal]?.text ??
            "Are you sure you want to continue?"
          }
          type={alertType[arenaActionModal] ?? "confirm"}
          onConfirm={confirmAction[arenaActionModal]}
        />
      )}

      {/* Prevent accidental duplicate saves; the modal owns its own UI. */}
      {savingArena && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: insets.top + 53,
            right: 16,
            zIndex: 30,
          }}
        >
          <ActivityIndicator size="small" color={GOLD} />
        </View>
      )}
    </View>
  );
}
