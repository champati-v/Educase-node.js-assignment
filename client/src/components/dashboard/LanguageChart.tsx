import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { Analytics } from '../../types'
import { generateChartColor } from '../../lib/utils'

interface LanguageChartProps {
  analytics: Analytics
}

export default function LanguageChart({ analytics }: LanguageChartProps) {
  const data = Object.entries(analytics.languageDistribution).map(
    ([name, value]) => ({
      name,
      value,
    })
  )

  const COLORS = data.map((_, index) => generateChartColor(index))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Language Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(215 35% 5%)',
                border: '1px solid hsl(215 25% 20%)',
                borderRadius: '0.5rem',
              }}
              formatter={(value: any) => `${value} repos`}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              isAnimationActive={true}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend with percentages */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {data.map((item, index) => {
            const total = data.reduce((sum, d) => sum + d.value, 0)
            const percentage = ((item.value / total) * 100).toFixed(1)
            return (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div className="text-xs">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-muted-foreground">{percentage}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
