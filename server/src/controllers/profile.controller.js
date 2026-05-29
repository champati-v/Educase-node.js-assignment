import prisma from '../config/prisma.js';

export const getAnalyzedProfile = async (req, res) => {
    
    try{
        const limit = Number(req.query.limit) || 5;
        const profiles = await prisma.profile.findMany({
            include: {
                analytics: {
                    select:  {
                        developerScore: true,
                    },
                },
            },
            take: limit,
            orderBy: {
                lastAnalyzedAt: 'desc',
            },
        });

        const formattedProfiles = profiles.map((profile) => ({
            login: profile.login,
            avatarUrl: profile.avatarUrl,
            lastAnalyzedAt: profile.lastAnalyzedAt,
            developerScore: profile.analytics?.developerScore ?? 0,
        }));

        res.status(200).json({
            success: true,
            data: formattedProfiles,
            count: formattedProfiles.length,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}