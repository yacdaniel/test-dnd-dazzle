package helpers

/**
 * Targeting rules helper
 */
public class TargetingHelper {

    /**
     * get the homepage scenario with the best fit for the given profile
     * @param Profile of the current user
     */
    public determineSeason(profile) {
        def season = "Season"

        if(profile) {
            if(profile.attributes) {
                if (profile.attributes.season) {
                    season = profile.attributes.season
                }
            }
        }

        return season
    }
}