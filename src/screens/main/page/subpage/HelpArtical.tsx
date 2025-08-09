// src/screens/help/HelpArticle.jsx
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Icon from '../../../../MainLogo/icon/Icon';
import PageNavigation from '../../../../layout/navigation/PageNavigation';

// Example HelpArticles data
const HelpArticles = [
    {
        id: '1',
        title: 'How to Place an Order',
        tag: 'Ordering',
        summary: 'Learn how to quickly place an order with Tiffin Walla.',
        overview: ['Open the app', 'Select your tiffin', 'Proceed to payment'],
        steps: ['Go to home screen', 'Select items', 'Add to cart', 'Checkout'],
        tips: ['Ensure internet connection', 'Check address before payment'],
        faqs: [
            { q: 'Can I cancel my order?', a: 'Yes, within 5 minutes of placing it.' },
        ],
    },
    {
        id: '2',
        title: 'Managing Your Profile',
        tag: 'Account',
        summary: 'Steps to edit your name, phone, and address.',
        overview: ['Open Profile tab', 'Click Edit', 'Save changes'],
        steps: ['Go to profile', 'Tap edit', 'Update fields', 'Save'],
        tips: ['Use real info for faster delivery'],
        faqs: [
            { q: 'Can I change my email?', a: 'No, email is fixed after signup.' },
        ],
    },
];

// Highlight text helper
const highlightText = (text, search) => {
    if (!search) return <Text>{text}</Text>;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
            <Text key={index} style={{ backgroundColor: 'yellow' }}>
                {part}
            </Text>
        ) : (
            <Text key={index}>{part}</Text>
        )
    );
};

const HelpArticle = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{ paddingHorizontal: 16 }}>
                <PageNavigation route="Help Center" />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>
                    Help & Support
                </Text>
                <Text style={{ color: 'black', marginTop: 4 }}>
                    All guides, troubleshooting, and FAQs for Tiffin Walla.
                </Text>
            </View>

            {/* Search */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    marginHorizontal: 16,
                    borderRadius: 999,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                }}
            >
                <Icon name="search" size={16} type="solid" color="#9CA3AF" />
                <TextInput
                    placeholder="Search in articles..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ marginLeft: 8, flex: 1, color: 'black' }}
                    className='placeholder:text-black'
                />
                {searchQuery ? (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Icon name="times-circle" size={18} type="solid" color="#9CA3AF" />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Articles */}
            <ScrollView ref={scrollRef} style={{ marginTop: 8 }}>
                {HelpArticles.map((article) => (
                    <View
                        key={article.id}
                        style={{
                            backgroundColor: 'white',
                            marginHorizontal: 16,
                            marginVertical: 8,
                            borderRadius: 12,
                            padding: 16,
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                        }}
                    >
                        {/* Title */}
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#111827' }}>
                            {highlightText(article.title, searchQuery)}
                        </Text>
                        <Text style={{ color: '#6B7280', marginTop: 4 }}>
                            {highlightText(article.summary, searchQuery)}
                        </Text>

                        {/* Overview */}
                        {article.overview?.length > 0 && (
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Overview</Text>
                                {article.overview.map((o, idx) => (
                                    <Text key={idx} style={{ color: '#374151', marginBottom: 2 }}>
                                        • {highlightText(o, searchQuery)}
                                    </Text>
                                ))}
                            </View>
                        )}

                        {/* Steps */}
                        {article.steps?.length > 0 && (
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Steps</Text>
                                {article.steps.map((s, idx) => (
                                    <Text key={idx} style={{ color: '#374151', marginBottom: 2 }}>
                                        {idx + 1}. {highlightText(s, searchQuery)}
                                    </Text>
                                ))}
                            </View>
                        )}

                        {/* Tips */}
                        {article.tips?.length > 0 && (
                            <View
                                style={{
                                    marginTop: 12,
                                    padding: 8,
                                    backgroundColor: '#FEF9C3',
                                    borderRadius: 8,
                                }}
                            >
                                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Tips</Text>
                                {article.tips.map((t, idx) => (
                                    <Text key={idx} style={{ color: '#92400E' }}>
                                        • {highlightText(t, searchQuery)}
                                    </Text>
                                ))}
                            </View>
                        )}

                        {/* FAQ */}
                        {article.faqs?.length > 0 && (
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>FAQ</Text>
                                {article.faqs.map((f, idx) => (
                                    <View key={idx} style={{ marginBottom: 6 }}>
                                        <Text style={{ fontWeight: '600', color: '#111827' }}>
                                            Q: {highlightText(f.q, searchQuery)}
                                        </Text>
                                        <Text style={{ color: '#374151' }}>
                                            A: {highlightText(f.a, searchQuery)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}

                <View style={{ height: 80 }} />
            </ScrollView>
        </View>
    );
};

export default HelpArticle;
