import { useEffect, useState } from 'react';
import { post } from './http/request'
import { Steps, Button, Input, message, Select, Radio } from 'antd'
import ObjectUpload from './ObjectUpload'
import MatterUpload from './MatterUpload';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  manageObjectProperties,
  propertyInitialization,
  platformconfiguration,
  manageObject,
  dept,
  matterSubject,
  matterDefintionInfo
} from './http/api'

let initToken = sessionStorage.getItem('token')
let initOrgID = sessionStorage.getItem('orgID')

function App() {

  // 编码表信息
  const [spaceType, setSpaceType] = useState([])  // 空间类型
  const [inputType, setInputType] = useState([])  // 输入框类型
  const [pointType, setPointType] = useState([])  // 指标统计类型
  const [fwbsType, setFwbsType] = useState([])  // 服务标识类型
  const [manageObj, setManageObj] = useState([])  // 管理对象列表
  const [deptList, setDeptList] = useState([])  // 部门信息列表
  const [loginList, setLoginList] = useState([])  // 登录信息列表

  const [radioType, setRadioType] = useState('对象')
  const [token, setToken] = useState(initToken || '')
  const [orgID, setOrgID] = useState(initOrgID || '')
  const [current, setCurrent] = useState(0);
  const [fields, setFields] = useState([])
  const [objFields, setObjFields] = useState([]);
  const [id, setId] = useState('');
  const [objectName, setObjectName] = useState('')
  const [objList, setObjList] = useState([])
  const [matterList, setMatterList] = useState([])
  const [matterDetail, setmatterDetail] = useState({})
  const [selectedObj, setSelectedObj] = useState({})
  const [selecteMatter, setSelecteMatter] = useState({})

  const enumQueryTypes = [
    {
      url: platformconfiguration,
      params: { type: 'dxzbkjlx' },
      setFunc: setSpaceType,
      type: 'dxzbkjlx'
    },  // 空间类型
    {
      url: platformconfiguration,
      params: { type: 'componentStyle' },
      setFunc: setInputType,
      type: 'componentStyle'
    },  // 输入框类型
    {
      url: platformconfiguration,
      params: { type: 'dxzbtjlx' },
      setFunc: setPointType,
      type: 'dxzbtjlx'
    },  // 指标统计类型
    {
      url: platformconfiguration,
      params: { size: 0, page: 0, type: 'dxdy_fwbs' },
      setFunc: setFwbsType,
      type: 'dxdy_fwbs'
    }, // 服务标识类型
    {
      url: manageObject,
      params: { size: '', organizationNumber: orgID, hasIcon: 1, page: '' },
      setFunc: setManageObj,
      type: 'manageObj'
    }, // 管理对象查询
    {
      url: dept,
      params: { size: '', organizationNumber: orgID, page: '' },
      setFunc: setDeptList,
      type: 'dept'
    }, // 部门信息列表查询
    {
      url: platformconfiguration,
      params: { type: 'sxdy_dlxx' },
      setFunc: setLoginList,
      type: 'sxdy_dlxx'
    },  // 登录信息列表

  ]

  const queryEnumsFunc = typesList => {
    const funcList = typesList.map(item => {
      return async function () {
        const [error, res] = await post(item.url, item.params)
        if (error) {
          message.error(`code: ${error.response.data.code}  message: ${error.response.data.message}`);
          return
        }
        if (res.data.success && res.data.results.length > 0) {
          item.setFunc(res.data.results)
        }
      }()
    })
    return funcList
  }


  // 公共属性查询
  useEffect(() => {
    queryPublicFields()
  }, []);

  // 编码表查询
  useEffect(() => {
    const funcList = queryEnumsFunc(enumQueryTypes)
    Promise.all(funcList)
  }, []);

  const queryPublicFields = async () => {
    const params = { syObjectNumber: " ", isShow: 1, page: 0, size: 0 }
    const [error, res] = await post(propertyInitialization, params)
    if (error) {
      message.error(`code: ${error.response.data.code}  message: ${error.response.data.message}`);
      return
    }
    if (res.data.success && res.data.results.length > 0) {
      setFields(res.data.results)
    } else {
      message.warning(res.data.message || 'Data is null');
    }
  }


  const queryObjInfo = async id => {
    const params = { organizationNumber: orgID, syObjectNumber: id, fieldName: "", isLastStage: 1, attributeLevel: 1, page: '', size: '' }
    const [error, res] = await post(manageObjectProperties, params)
    if (error) {
      message.error(`code: ${error.response.data.code}  message: ${error.response.data.message}`);
      return
    }
    if (res.data.success && res.data.results.length > 0) {
      message.success(res.data.msg)
      setObjFields(res.data.results)
      setObjectName(res.data.results[0].syObjectName)
      setCurrent(current + 1)
    } else {
      message.warning(res.data.message || 'Data is null');
    }
  }

  const queryMatterInfo = async (id, selecteMatter) => {
    const params = {
      organizationNumber: orgID,
      matterSubjectNumber: id,
      syObjectNumber: selecteMatter.syObjectNumber,
      managementServiceObjectNumber: selecteMatter.syObjectNumber,
    }
    const [error, res] = await post(matterDefintionInfo, params)
    if (error) {
      message.error(`code: ${error.response.data.code}  message: ${error.response.data.message}`);
      return
    }
    if (res.data.success && res.data.results.length > 0) {
      message.success(res.data.msg || '查询成功')
      setmatterDetail(res.data.results[0])
      setCurrent(current + 1)
    } else {
      message.warning(res.data.msg || 'Data is null');
    }
  }

  const searchManageObj = async val => {
    const params = {
      page: 1,
      size: 10,
      organizationNumber: orgID,
      hasIcon: 1,
      syObjectName: `%${val.trim()}%`
    }
    const [error, res] = await post(manageObject, params)
    if (error) {
      message.error(`code: ${error.response.data.code}  message: ${error.response.data.message}`);
      return
    }
    if (res.data.success && res.data.results.length > 0) {
      setObjList(res.data.results)
    }
  }

  const searchMatters = async val => {
    const params = {
      page: 1,
      size: 10,
      organizationNumber: orgID,
      querySearch: 1,
      querySyobjectName: true,
      matterSubjectName: val.trim()
    }
    const [error, res] = await post(matterSubject, params)
    if (error) {
      message.error(`code: ${error.response.data.code}  message: ${error.response.data.message}`);
      return
    }
    if (res.data.success && res.data.results.length > 0) {
      setMatterList(res.data.results)
    }
  }



  const handleConfirm = async () => {
    if (!id) {
      message.warning(`请选择${radioType}`)
      return
    }

    if (radioType === '对象') {
      await queryObjInfo(id)
    }

    if (radioType === '事项') {
      await queryMatterInfo(id, selecteMatter)
    }

    setId('')
  }

  const handleBack = () => {
    setCurrent(current - 1)
  }

  const handleNext = () => {
    setCurrent(0)
  }

  const handleRefresh = () => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('orgID', orgID)
    window.location.reload()
  }

  const handleSearchObject = val => {
    searchManageObj(val)
  }

  const handleObjectChange = val => {
    setId(val[0])
    setSelectedObj(val[1])
  }

  const handleSearchMatter = val => {
    searchMatters(val)
  }

  const handleMatterChange = val => {
    setId(val[0])
    setSelecteMatter(val[1])
  }

  const handleRadioChange = event => {
    setRadioType(event.target.value)
    setId('')
  }

  const onTokenChange = event => {
    setToken(event.target.value.trim())
  }

  const onOrgIDChange = event => {
    setOrgID(event.target.value.trim())
  }

  const objectProps = {
    spaceType,
    inputType,
    pointType,
    fwbsType,
    manageObj,
    deptList,
    addCurrent: () => { setCurrent(current + 2) },
    objFields,
    objectName,
    selectedObj,
    fields
  }

  const matterProps = {
    matterDetail,
    addCurrent: () => { setCurrent(current + 2) },
    loginList,
  }

  return (
    <>
      <div>
        <div className='radio-box'>
          <Radio.Group onChange={handleRadioChange} defaultValue="对象" buttonStyle="solid">
            <Radio.Button value="对象">对象</Radio.Button>
            <Radio.Button value="事项">事项</Radio.Button>
          </Radio.Group>
        </div>
        <div>
          <b>机构ID：</b>
          <Input
            className='org-input'
            placeholder="机构ID"
            value={orgID}
            onChange={onOrgIDChange}
          />
        </div>
        <div>
          <b>Token：</b>
          <Input
            className='toke-input'
            placeholder="login-token"
            value={token}
            onChange={onTokenChange}
          />
          <Button className='toke-button' type="primary" onClick={handleRefresh}>Refresh</Button>
        </div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <div className='steps-box'>
          <Steps
            current={current}
            items={[
              {
                title: 'step1',
                description: `选择${radioType}`,
              },
              {
                title: 'step2',
                description: '选择excel模板',
              },
              {
                title: 'done',
              },
            ]}
          />
        </div>

        {current === 0 && <div className='input-box'>
          {
            radioType === '对象' ?
              <Select
                className='margin-top search-style'
                showSearch
                placeholder='搜索对象'
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearchObject}
                onChange={(...e) => { handleObjectChange(e) }}
                notFoundContent={null}
                options={(objList || []).map((item) => ({
                  ...item,
                  value: item.syObjectNumber,
                  label: item.syObjectName,
                }))}
              /> :
              <Select
                className='margin-top search-style'
                showSearch
                placeholder='搜索事项'
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearchMatter}
                onChange={(...e) => { handleMatterChange(e) }}
                notFoundContent={null}
                options={(matterList || []).map((item) => ({
                  ...item,
                  value: item.matterSubjectNumber,
                  label: item.objectSubjectName,
                }))}
              />
          }
          <Button className='margin-top' type="primary" onClick={handleConfirm}>Confirm</Button>
        </div>}
        {current === 1 && <div>
          {
            radioType === '对象' ?
              <ObjectUpload {...objectProps} />
              :
              <MatterUpload {...matterProps} />
          }
          <Button className='margin-top' type="primary" onClick={handleBack}>Go Back</Button>
        </div>}
        {current === 3 && <div>
          <Button className='margin-top' type="primary" onClick={handleNext}>Next</Button>
        </div>}
      </div>
    </>
  )
}

export default App
