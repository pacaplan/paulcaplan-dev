import Link from 'next/link'

export default function Home () {
  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center'>
        {/* 90s Style Header */}
        <div className='mb-8'>
          <h1 className='text-4xl md:text-6xl font-bold rainbow-text mb-4'>
            🚧 UNDER CONSTRUCTION 🚧
          </h1>
          <div className='flex justify-center items-center gap-2 mb-4'>
            <div className='w-4 h-4 bg-red-500 rounded-full blink' />
            <div className='w-4 h-4 bg-yellow-500 rounded-full blink' style={{ animationDelay: '0.2s' }} />
            <div className='w-4 h-4 bg-green-500 rounded-full blink' style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Construction Animation */}
        <div className='mb-8'>
          <div className='bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg p-8 mb-4'>
            <div className='text-6xl mb-4 construction-bounce'>🚧</div>
            <div className='flex justify-center items-center gap-2 mb-4'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full animate-pulse' />
              <div className='w-3 h-3 bg-orange-500 rounded-full animate-pulse' style={{ animationDelay: '0.2s' }} />
              <div className='w-3 h-3 bg-red-500 rounded-full animate-pulse' style={{ animationDelay: '0.4s' }} />
            </div>
            <div className='text-gray-600 font-mono text-sm text-center'>
              <div className='animate-pulse'>⚡ WORK IN PROGRESS ⚡</div>
              <div className='text-xs mt-2 text-gray-500'>
                Best viewed in Netscape Navigator 3.0
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Welcome to the Future! 🌟
          </h2>
          <p className='text-gray-600 mb-6'>
            This is a modern Next.js starter project with AI chat capabilities,
            styled with a nostalgic 90s web aesthetic.
          </p>
        </div>

        {/* Navigation */}
        <div className='space-y-4'>
          <Link
            href='/chat'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors transform hover:scale-105 shadow-lg'
          >
            💬 Enter the Chat Room
          </Link>

          <div className='text-sm text-gray-500'>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className='mt-2'>
              <span className='inline-block w-2 h-2 bg-green-500 rounded-full mr-2' />
              Server Status: Online
            </p>
          </div>
        </div>

        {/* 90s Style Footer */}
        <div className='mt-8 pt-6 border-t border-gray-200'>
          <div className='flex justify-center items-center gap-4 text-sm text-gray-500'>
            <span>© 2025</span>
            <span>•</span>
            <span>Made with ❤️ and Next.js</span>
            <span>•</span>
            <span>Best viewed at 800x600</span>
          </div>
          <div className='mt-2 text-xs text-gray-400'>
            <p>This site is optimized for dial-up connections</p>
          </div>
        </div>
      </div>
    </div>
  )
}
