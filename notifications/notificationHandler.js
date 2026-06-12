import { router } from "expo-router";


export const notificationHandler = {
    contest_joined:
    async (data) => {
      router.push({
        pathname: "/TalentContestRoom",
        params: {
          region:
            data.stageRegion,
          selectedTalent:
            data.stageName,
          location:
            "contest",
          startIntroduction:
            "true",
          showGo:
            "true",
          contestant_id:
            data.contestant_id || null,
          startPlayer : "true"
        },
      });
    },
    friend_request:
    async (data) => {
      router.push({
        pathname: "/Friends",
      });
    },
    performance_posted:
    async (data) => {
      router.push({
        pathname: "/TalentContestRoom",
        params: {
          region:
            data.stageRegion,
          selectedTalent:
            data.stageName,
          location:
            "contest",
          startIntroduction:
            "true",
          showGo:
            "true",
          contestant_id:
            data.contestant_id || null,
          startPlayer : "true"
        },
      });
    },
    contest_queued:
    async (data) => {
      router.push({
        pathname: "/TalentContestRoom",
        params: {
          region:
            data.stageRegion,
          selectedTalent:
            data.stageName,
          location:
            "contest",
          startIntroduction:
            "true",
          showGo:
            "true",
          contestant_id:
            data.contestant_id || null,
          startPlayer : "true"
        },
      });
    },
    vote_received:
    async (data) => {
      router.push({
        pathname: "/TalentContestRoom",
        params: {
          region:
            data.stageRegion,
          selectedTalent:
            data.stageName,
          location:
            "contest",
          startIntroduction:
            "true",
          showGo:
            "true",
          contestant_id:
            data.contestant_id || null,
          startPlayer : "true"
        },
      });
    },
    eliminated:
    async (data) => {
      router.push({
        pathname: "/TalentContestRoom",
        params: {
          region:
            data.stageRegion,
          selectedTalent:
            data.stageName,
          location:
            "contest",
          startIntroduction:
            "true",
          showGo:
            "true",
          contestant_id: null,
          startPlayer : "false"
        },
      });
    },
};