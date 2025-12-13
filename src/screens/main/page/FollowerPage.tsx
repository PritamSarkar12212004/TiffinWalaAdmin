import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Modal,
    StyleSheet
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import PageNavigation from '../../../layout/navigation/PageNavigation';
import useFetchFollower from '../../../hooks/api/follower/useFetchFollower';
import { userContext } from '../../../util/context/ContextProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDeleteFollower from '../../../hooks/api/follower/useDeleteFollower';

const FollowerPage = (): React.JSX.Element => {
    const { adminDatabase } = userContext();
    const adminId = adminDatabase?.adminMainData?._id;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const [detchDetiles, setFetchDetiles] = useState<any>(null);
    const [loadingFetch, setLoadingFetch] = useState<{ status: boolean; id: string | null }>({ status: false, id: null });

    const { top } = useSafeAreaInsets();

    const { fetchFollower } = useFetchFollower();
    const { deleteFollower } = useDeleteFollower();

    // Pull to refresh
    const onRefresh = useCallback(async () => {
        if (!adminId) return;
        setRefreshing(true);
        try {
            await fetchFollower({
                id: adminId,
                setLoading: () => setRefreshing(false),
                setData,
            });
        } catch (err) {
            console.error(err);
            setRefreshing(false);
        }
    }, [adminId]);


    // Remove follower
    const handleRemoveFollower = async (followerId: string) => {
        try {
            await deleteFollower(followerId);
            setFetchDetiles(null);
            onRefresh();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!adminId) return;
            setLoading(true);
            try {
                await fetchFollower({
                    id: adminId,
                    setLoading: (val: boolean) => { if (isMounted) setLoading(val); },
                    setData: (val: any[]) => { if (isMounted) setData(val); }
                });
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchData();

        return () => { isMounted = false; };
    }, [adminId]);

    const renderItem = useCallback(({ item }: any) => (
        <TouchableOpacity
            activeOpacity={0.8}
            className="w-full bg-white px-4 py-3 mb-3 rounded-xl flex gap-1 shadow-sm"
            style={{
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
            }}
        >
            <View className="w-full flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-3 flex-1">
                    <Image
                        source={{ uri: item.followerImg }}
                        className="h-14 w-14 rounded-full"
                        resizeMode="cover"
                    />
                    <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-800" numberOfLines={1}>
                            {item.follwerName}
                        </Text>
                        <Text className="text-sm text-gray-500 mt-1">@{item.followingId.substring(0, 8)}</Text>
                    </View>
                </View>
                <View className="ml-2">
                    <View className="bg-orange-100 px-3 py-1.5 rounded-full">
                        <Text className="font-semibold text-orange-600 text-xs">Following</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    ), [loadingFetch]);

    return (
        <View className="flex-1 bg-white px-3">
            <PageNavigation route={"Followers"} />
    
            {/* Followers List */}
            {loading ? (
                <View className="flex-1 flex items-center justify-center">
                    <ActivityIndicator size="large" color="#F97316" />
                    <Text className="text-gray-500 mt-3">Loading followers...</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    ListEmptyComponent={
                        <View style={styles.noDataContainer}>
                            <View style={styles.noDataContent}>
                                <View style={styles.noDataIcon}>
                                    <Text style={styles.noDataEmoji}>📍</Text>
                                </View>
                                <Text style={styles.noDataTitle}>No Followers Yet</Text>
                                <Text style={styles.noDataDescription}>
                                    You don't have any followers with location data at the moment.
                                    When followers join with location sharing enabled, they'll appear here.
                                </Text>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => item._id || index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            )}
        </View>
    );
};

export default FollowerPage;

const styles = StyleSheet.create({
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 24,
    },
    noDataContent: {
        alignItems: 'center',
        maxWidth: 300,
    },
    noDataIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    noDataEmoji: {
        fontSize: 36,
    },
    noDataTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 12,
        textAlign: 'center',
    },
    noDataDescription: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
});
