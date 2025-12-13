export const mockDataset = {
  dimensions: [
    {id: 11, field: 'date', label: '对话开始时间' },
    {id: 12, field: 'channel', label: '渠道' },
    {id: 13, field: 'agent', label: '接入分组' },
    {id: 14, field: 'creator', label: '名片创建者' }
  ],
  metrics: [
    { field: 'validConversations', label: '有效对话数' },
    { field: 'validCards', label: '有效名片数' },
    { field: 'conversationCount', label: '对话数' },
    { field: 'retentionRate', label: '留联率' }
  ]
}

export const mockChartData = [
  { date: '2025-11', channel: '分组1', creator: '创建者A', validConversations: 120, validCards: 38, conversationCount: 395, retentionRate: 26.76 },
  { date: '2025-11', channel: '分组2', creator: '创建者B', validConversations: 90, validCards: 63, conversationCount: 398, retentionRate: 29.47 },
  { date: '2025-12', channel: '分组1', creator: '创建者A', validConversations: 403, validCards: 111, conversationCount: 403, retentionRate: 26.76 },
  { date: '2025-12', channel: '分组2', creator: '创建者B', validConversations: 291, validCards: 155, conversationCount: 291, retentionRate: 29.47 }
]
