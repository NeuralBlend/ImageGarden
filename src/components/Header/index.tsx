import { DraggablePanel } from '@/components'
import { BoldOutlined, GithubOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useResponsive } from 'antd-style'
import qs from 'query-string'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import Setting from './Setting'
import { civitaiLogo, themeIcon } from './style'

const HeaderView = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: -webkit-fill-available;

  #tabs.header {
    .tab-nav {
      border: none !important;
      margin: 0 !important;
    }
    button {
      cursor: pointer;
      border: none !important;
      background: transparent !important;
      flex: none;
      transition: all 0.2s ease-in-out;
      padding: 8px !important;
      border-radius: 4px !important;
      margin: 0 !important;
      flex: 0 !important;
      &:hover {
        border: none !important;
        color: var(--color-text) !important;
        background: var(--color-fill-tertiary) !important;
        flex: none;
      }
      &.selected {
        border: none !important;
        background: transparent !important;
        color: var(--color-text) !important;
        flex: none;
        font-weight: 600;
      }
    }
  }
`

interface HeaderProps {
  children: React.ReactNode
  themeMode: 'dark' | 'light'
}

const Header: React.FC<HeaderProps> = ({ children, themeMode }) => {
  const { mobile } = useResponsive()
  const [expand, setExpand] = useState<boolean>(true)
  const handleSetTheme = useCallback(() => {
    const theme = themeMode === 'light' ? 'dark' : 'light'
    const gradioURL = qs.parseUrl(window.location.href)
    gradioURL.query.__theme = theme
    window.location.replace(qs.stringifyUrl(gradioURL))
  }, [themeMode])

  useEffect(() => {
    if (mobile) setExpand(false)
  }, [])

  return (
    <DraggablePanel placement="top" defaultSize={{ height: 'auto' }} isExpand={expand} onExpandChange={setExpand}>
      <HeaderView id="header" style={{ flexDirection: mobile ? 'column' : 'row' }}>
        <a href="https://github.com/canisminor1990/sd-web-ui-kitchen-theme" target="_blank" rel="noreferrer">
          <Logo themeMode={themeMode} />
        </a>
        {children}
        <Space.Compact>
          <a href="https://civitai.com/" target="_blank" rel="noreferrer">
            <Button title="Civitai" icon={civitaiLogo} />
          </a>
          <a href="https://www.birme.net/?target_width=512&target_height=512" target="_blank" rel="noreferrer">
            <Button title="Birme" icon={<BoldOutlined />} />
          </a>
          <a href="https://github.com/canisminor1990/sd-webui-kitchen-theme" target="_blank" rel="noreferrer">
            <Button title="Github" icon={<GithubOutlined />} />
          </a>
          <Setting />
          <Button title="Switch Theme" icon={themeIcon[themeMode]} onClick={handleSetTheme} />
        </Space.Compact>
      </HeaderView>
    </DraggablePanel>
  )
}

export default React.memo(Header)
