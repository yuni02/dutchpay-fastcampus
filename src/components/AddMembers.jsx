import { InputTags } from "react-bootstrap-tagsinput"
import { useSetRecoilState } from "recoil"
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm"
import { groupMembersState } from "../state/groupMembers"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTE_UTILS } from "../routes"
import styled from "styled-components"
import { Form } from "react-bootstrap"
import { put } from "aws-amplify/api"
import { useGroupData } from "../hooks/useGroupData"

export const AddMembers = () => {
  const { groupId, groupName, groupMembers } = useGroupData()
  const [groupMembersString, setGroupMembersString] = useState('')
  const setGroupMembers = useSetRecoilState(groupMembersState)
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()

  const saveGroupMembers = async () => {
    try {
      await put({
        apiName: 'groupsApi',
        path: `/groups/${groupId}/members`,
        options: {
          body: {
            members: groupMembers
          }
        }
      }).response
      navigate(ROUTE_UTILS.EXPENSE_MAIN(groupId))
    } catch (error) {
      alert(error.response || 'An error occurred')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValidated(true)
    if (groupMembers && groupMembers.length > 0) {
      saveGroupMembers()
      navigate(ROUTE_UTILS.EXPENSE_MAIN(groupId))
    } else if (isSamsungInternet && groupMembersString.length > 0) {
      saveGroupMembers()
      setGroupMembers(groupMembersString.split(','))
    }
  }

  const isSamsungInternet = window.navigator.userAgent.includes('SAMSUNG')

  const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`

  return (
      <CenteredOverlayForm
          title={header}
          validated={validated}
          handleSubmit={handleSubmit}
      >
        { isSamsungInternet ?
            <Form.Control
                placeholder="이름 간 컴마(,)로 구분"
                onChange={({target}) => setGroupMembersString(target.value)}
            />
            :
            <InputTags
                values={groupMembers}
                data-testid="input-member-names"
                placeholder="이름 간 띄어 쓰기"
                onTags={(value) => setGroupMembers(value.values)}
            />
        }
        {validated && groupMembers.length === 0 && (
            <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요.</StyledErrorMessage>
        )}
      </CenteredOverlayForm>
  )
}

const StyledErrorMessage = styled.span`
  color: red;
`