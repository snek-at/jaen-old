import {Box, HStack, Icon, Tag, Text} from '@chakra-ui/react'
import Tree, {BasicDataNode, TreeNodeProps, TreeProps} from 'rc-tree'

import 'rc-tree/assets/index.css'
import './tree.css'
import {HiDocument, HiMinus, HiPlus} from 'react-icons/hi'
import React, {Children} from 'react'
import {DataNode} from 'rc-tree/lib/interface.js'

export interface PageTreeProps {}

const useTreeState = (initTreeData: DataNode[]) => {
  const [treeData, setTreeData] = React.useState<DataNode[]>(initTreeData)

  const onExpand = (expandedKeys: string[]) => {}

  const onSelect = (selectedKeys: string[], info: any) => {}

  const onCheck = (checkedKeys: string[], info: any) => {}

  const onDrop: TreeProps['onDrop'] = info => {
    console.log('drop', info)
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data: any[], key: string | number, callback: any) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr)
          return
        }
        if (item.children) {
          loop(item.children, key, callback)
        }
      })
    }
    const data = [...treeData]

    // Find dragObject
    let dragObj: any
    loop(data, dragKey, (item: any, index: any, arr: any[]) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (dropPosition === 0) {
      // Drop on the content
      loop(data, dropKey, (item: {children: any[]}) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || []
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj)
      })
    } else {
      // Drop on the gap (insert before or insert after)
      let ar: any[] = []
      let i: number = 0
      loop(data, dropKey, (item: any, index: any, arr: any) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }

    setTreeData(data)
  }

  const onDragEnter: TreeProps['onDragEnter'] = () => {}

  const onDragStart: TreeProps['onDragStart'] = () => {}

  const defaultCheckedKeys = ['0-0-0']
  const defaultSelectedKeys = ['0-0-0']

  return {
    onExpand,
    onSelect,
    onCheck,
    defaultCheckedKeys,
    defaultSelectedKeys,
    treeData,
    onDrop,
    onDragEnter,
    onDragStart
  }
}

export const PageTree: React.FC<PageTreeProps> = props => {
  const {
    onExpand,
    onSelect,
    onCheck,
    onDrop,
    defaultCheckedKeys,
    defaultSelectedKeys,
    treeData
  } = useTreeState([
    {
      key: '0-0',
      title: 'News',
      children: [
        {
          key: '0-0-0',
          title: 'Alles über die neue Version'
        },
        {
          key: '0-0-1',
          title: 'Neue Features'
        },
        {
          key: '0-0-2',
          title: 'Wissenswertes über HTML'
        }
      ]
    },
    {
      key: '0-1',
      title: 'Tutorials',
      children: [
        {
          key: '0-1-0',
          title: 'HTML'
        },
        {
          key: '0-1-1',
          title: 'CSS'
        },
        {
          key: '0-1-2',
          title: 'JavaScript'
        },
        {
          key: '0-1-3',
          title: 'Reacteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        }
      ]
    }
  ])

  return (
    <>
      <h1>PageTree</h1>
      <Box fontSize={'lg'} userSelect="none">
        <Tree
          titleRender={node => {
            const childrenLength = node.children?.length || 0

            return (
              <HStack>
                <Text whiteSpace={'break-spaces'} wordBreak="break-word">
                  {node.title?.toString()}
                </Text>

                {childrenLength > 0 && <Tag size={'sm'}>{childrenLength}</Tag>}
              </HStack>
            )
          }}
          className="myCls"
          showLine
          checkStrictly={true}
          defaultExpandAll
          onExpand={onExpand}
          onRightClick={({event, node}) => {
            alert('right click')
          }}
          draggable
          onDragStart={event => {}}
          onDragEnter={event => {}}
          onDrop={onDrop}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultCheckedKeys={defaultCheckedKeys}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
          icon={<Icon as={HiDocument} backgroundColor="white" />}
          switcherIcon={nodeProps => {
            if (nodeProps.isLeaf) {
              return null
            }

            return (
              <Icon
                as={nodeProps.expanded ? HiMinus : HiPlus}
                backgroundColor="white"
              />
            )
          }}
        />
      </Box>
    </>
  )
}
